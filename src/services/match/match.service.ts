import AppDataSource from "../../data-source";
import { user } from "../../entities";
import { AppError } from "../../errors/AppError";
import getDistance from "../../utils/distance.utils";

export default async function matchService(userId: string) {
  const userRepository = AppDataSource.getRepository(user);

  const requestUser = await userRepository.findOneBy({ id: userId });

  if (!requestUser) {
    throw new AppError(404, "User not found");
  }

  const allUser = await userRepository.find();

  let usersByScore : any = [];

  allUser.forEach((sendUser) => {
    
    if (requestUser.id == sendUser.id) {
        return
    }
    
    let score = 0;

    // Remove usuários ou adiciona score do user quem tenham/sejam pets/crianças/fumante/alcoolista e ele não esteja procurando por isso

    if (
      !requestUser.profile.lookingFor.pets &&
      sendUser.userAdditionalData.pets.length > 0
    ) {
      return;
    }
    if (
      requestUser.profile.lookingFor.pets &&
      sendUser.userAdditionalData.pets.length > 0
    ) {
      score += 10;
    }
    if (
      !requestUser.profile.lookingFor.kids &&
      sendUser.userAdditionalData.kids
    ) {
      return;
    }

    if (
      !requestUser.profile.lookingFor.smoker &&
      sendUser.userAdditionalData.smoker
    ) {
      return;
    }

    if (
      !requestUser.profile.lookingFor.drinker &&
      sendUser.userAdditionalData.drinker
    ) {
      return;
    }

    // Adiciona score caso os dois usuário estejam buscando a mesma coisa

    if (
      requestUser.profile.typeOfRelationship.casual &&
      sendUser.profile.typeOfRelationship.casual
    ) {
      score += 10;
    }

    if (
      requestUser.profile.typeOfRelationship.friendship &&
      sendUser.profile.typeOfRelationship.friendship
    ) {
      score += 10;
    }

    if (
      requestUser.profile.typeOfRelationship.serious &&
      sendUser.profile.typeOfRelationship.serious
    ) {
      score += 10;
    }

    // Remove usuário caso não esteja na idade buscada

    const rangeAge = requestUser.profile.lookingFor.age.split("-");

    if (
      Number(sendUser.age) <= Number(rangeAge[0]) ||
      Number(sendUser.age) >= Number(rangeAge[1])
    ) {
      return;
    }

    // Remove usuário que não são buscado no gênero

    const lookGender: any = requestUser.profile.lookingFor.gender;

    if (!lookGender.split["/"].includes(sendUser.profile.gender)) {
      return;
    }

    // dá score caso o usuário tenham mesmas educações (buscada e criada)

    const lookEducatio: any =
      requestUser.profile.lookingFor.education.split("/");

    if (lookEducatio.includes(sendUser.profile.education)) {
      score += 10;
    }

    // remove usuário caso esteja fora do range que user gostaria, adiciona score conforme proximidade

    const requestUserlocation = {
      lat: requestUser.location?.split("/")[0],
      lng: requestUser.location?.split("/")[1],
    };

    const sendUserLocation = {
      lat: sendUser.location?.split("/")[0],
      lng: sendUser.location?.split("/")[1],
    };

    const distance = Number(getDistance(requestUserlocation, sendUserLocation));

    if (distance > Number(requestUser?.profile?.lookingFor?.location)) {
      return;
    }

    if (distance <= 10) {
      score += 15
    }

    if (distance <= 15 && distance > 10) {
      score += 10
    }

    if (distance <= 20 && distance > 1) {
        score += 5
      }

    // score para se signo se batem

    const lookZodiac: any = requestUser.profile.lookingFor.zodiac;

    if (
      !lookZodiac.split["/"].includes(sendUser.userAdditionalData.zodiac) &&
      sendUser.userAdditionalData.zodiac != undefined
    ) {
      score -= 3;
    }

    if (lookZodiac.split["/"].includes(sendUser.userAdditionalData.zodiac)) {
      score += 10;
    }

    // score para mesmos tipos de hobbie

    const requestUserHobbies = [];

    for (const hobbie of requestUser.userAdditionalData.hobbies) {
      requestUserHobbies.push(hobbie.name);
    }

    const sendUserHobbies: any = [];

    for (const hobbie of requestUser.userAdditionalData.hobbies) {
      sendUserHobbies.push(hobbie.name);
    }

    requestUserHobbies.forEach((reqUSerHobbie) => {
      if (sendUserHobbies.includes(reqUSerHobbie)) {
        score += 2;
      }
    });

    // score para mesmos gostos musicais

    const requestUserMusical = [];

    for (const hobbie of requestUser.userAdditionalData.hobbies) {
      requestUserHobbies.push(hobbie.name);
    }

    const sendUserMusical: any = [];

    for (const hobbie of requestUser.userAdditionalData.hobbies) {
      sendUserHobbies.push(hobbie.name);
    }

    requestUserHobbies.forEach((reqUSerHobbie) => {
      if (sendUserHobbies.includes(reqUSerHobbie)) {
        score += 2;
      }
    });

    usersByScore.push({score, sendUser})
  });

  const response = usersByScore.sort((a : any, b : any) => b.score - a.score)

  return response
}
