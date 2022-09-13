import getDistance from "./distance.utils";

export default async function AlgMathc(requestUser: any, sendUser: any) {
  if (requestUser.id === sendUser.id) {
    return;
  }

  let score = 0;

  // Remove usuários ou adiciona score do user quem tenham/sejam pets/crianças/fumante/alcoolista e ele não esteja procurando por isso

    if (
      !requestUser?.profile?.lookingFor?.pets &&
      sendUser?.userAdditionalData?.pets.length > 0 &&
      requestUser?.profile?.lookingFor?.pets !== undefined &&
      sendUser?.userAdditionalData?.pets !== undefined
    ) {
      return;
    }
  if (
    requestUser?.profile?.lookingFor?.pets &&
    sendUser?.userAdditionalData?.pets?.length > 0 &&
    requestUser?.profile?.lookingFor?.pets !== undefined &&
    sendUser?.userAdditionalData?.pets !== undefined
  ) {
    score += 10;
  }

  if (
    !requestUser?.profile?.lookingFor?.kids &&
    sendUser?.userAdditionalData?.kids &&
    requestUser?.profile?.lookingFor?.kids !== undefined &&
    sendUser?.userAdditionalData?.kids !== undefined
  ) {
    return;
  }

  if (
    requestUser?.profile?.lookingFor?.kids &&
    sendUser?.userAdditionalData?.kids &&
    requestUser?.profile?.lookingFor?.kids !== undefined &&
    sendUser?.userAdditionalData?.kids !== undefined
  ) {
    score += 10;
  }

  if (
    !requestUser?.profile?.lookingFor?.smoker &&
    sendUser?.userAdditionalData?.smoker &&
    requestUser?.profile?.lookingFor?.smoker !== undefined &&
    sendUser?.userAdditionalData?.smoker !== undefined
  ) {
    return;
  }

  if (
    requestUser?.profile?.lookingFor?.smoker &&
    sendUser?.userAdditionalData?.smoker &&
    requestUser?.profile?.lookingFor?.smoker !== undefined &&
    sendUser?.userAdditionalData?.smoker !== undefined
  ) {
    score += 10;
  }

//   if (
//     !requestUser?.profile?.lookingFor?.drinker &&
//     sendUser?.userAdditionalData?.drinker &&
//     requestUser?.profile?.lookingFor?.drinker !== undefined &&
//     sendUser?.userAdditionalData?.drinker !== undefined
//   ) {
//     return;
//   }

  if (
    requestUser?.profile?.lookingFor?.drinker &&
    sendUser?.userAdditionalData?.drinker &&
    requestUser?.profile?.lookingFor?.drinker !== undefined &&
    sendUser?.userAdditionalData?.drinker !== undefined
  ) {
    score += 10;
  }

  // Adiciona score caso os dois usuário estejam buscando a mesma coisa

  if (
    requestUser?.profile?.typeOfRelationship?.casual &&
    sendUser?.profile?.typeOfRelationship?.casual &&
    requestUser?.profile?.typeOfRelationship?.casual !== undefined &&
    sendUser?.profile?.typeOfRelationship?.casual !== undefined
  ) {
    score += 10;
  }

  if (
    requestUser?.profile?.typeOfRelationship?.friendship &&
    sendUser?.profile?.typeOfRelationship?.friendship &&
    requestUser?.profile?.typeOfRelationship?.friendship !== undefined &&
    sendUser?.profile?.typeOfRelationship?.friendship !== undefined
  ) {
    score += 10;
  }

  if (
    requestUser?.profile?.typeOfRelationship?.serious &&
    sendUser?.profile?.typeOfRelationship?.serious &&
    requestUser?.profile?.typeOfRelationship?.serious !== undefined &&
    sendUser?.profile?.typeOfRelationship?.serious !== undefined
  ) {
    score += 10;
  }

  // Remove usuário caso não esteja na idade buscada

  const rangeAge = requestUser?.profile?.lookingFor?.age?.split("-");

  if (rangeAge !== undefined && sendUser?.age !== undefined) {
    if (
      Number(sendUser?.age) <= Number(rangeAge[0]) ||
      Number(sendUser?.age) >= Number(rangeAge[1])
    ) {
      return;
    }
  }

  // Remove usuário que não são buscado no gênero

  const lookGender: any = requestUser?.profile?.lookingFor?.gender;

  if (
    !lookGender?.split("/")?.includes(sendUser?.profile?.gender) &&
    lookGender !== undefined &&
    sendUser?.profile?.gender !== undefined
  ) {
    return;
  }

  // dá score caso o usuário tenham mesmas educações (buscada e criada)

  const lookEducatio: any =
    requestUser?.profile?.lookingFor?.education?.split("/");

  if (lookEducatio?.includes(sendUser?.profile?.education)) {
    score += 10;
  }

  // remove usuário caso esteja fora do range que user gostaria, adiciona score conforme proximidade

  const requestUserlocation = {
    lat: requestUser?.location?.split("/")[0],
    lng: requestUser?.location?.split("/")[1],
  };

  const sendUserLocation = {
    lat: sendUser?.location?.split("/")[0],
    lng: sendUser?.location?.split("/")[1],
  };

  const distance = Number(getDistance(requestUserlocation, sendUserLocation));

  if (
    distance > Number(requestUser?.profile?.lookingFor?.location) &&
    distance !== undefined &&
    requestUser?.profile?.lookingFor?.location !== undefined
  ) {
    return;
  }

  if (distance <= 10) {
    score += 15;
  }

  if (distance <= 15 && distance > 10) {
    score += 10;
  }

  if (distance <= 20 && distance > 1) {
    score += 5;
  }

  // score para se signo se batem

  const lookZodiac: any = requestUser?.profile?.lookingFor?.zodiac;

  if (
    !lookZodiac?.split["/"]?.includes(sendUser?.userAdditionalData?.zodiac) &&
    sendUser?.userAdditionalData?.zodiac != undefined
  ) {
    score -= 3;
  }

  if (lookZodiac?.split["/"]?.includes(sendUser?.userAdditionalData?.zodiac)) {
    score += 10;
  }

  // score para mesmos tipos de hobbie

  const requestUserHobbies = [];

  if (requestUser?.userAdditionalData?.hobbies !== undefined) {
    for (const hobbie of requestUser?.userAdditionalData?.hobbies) {
      requestUserHobbies.push(hobbie?.name);
    }
  }
  const sendUserHobbies: any = [];

  if (requestUser?.userAdditionalData?.hobbies) {
    for (const hobbie of requestUser?.userAdditionalData?.hobbies) {
      sendUserHobbies.push(hobbie?.name);
    }
  }

  requestUserHobbies.forEach((reqUSerHobbie) => {
    if (sendUserHobbies.includes(reqUSerHobbie)) {
      score += 2;
    }
  });

  // score para mesmos gostos musicais

  const requestUserMusical = [];

  if (requestUser?.userAdditionalData?.userMusicGenre !== undefined) {
    for (const msc of requestUser?.userAdditionalData?.userMusicGenre) {
      requestUserMusical.push(msc?.name);
    }
  }

  const sendUserMusical: any = [];

  if (sendUser?.userAdditionalData?.userMusicGenre !== undefined) {
    for (const msc of sendUser?.userAdditionalData?.userMusicGenre) {
      sendUserMusical.push(msc?.name);
    }
  }

  requestUserMusical.forEach((msc) => {
    if (sendUserMusical.includes(msc)) {
      score += 2;
    }
  });

  return { score, sendUser };
}
