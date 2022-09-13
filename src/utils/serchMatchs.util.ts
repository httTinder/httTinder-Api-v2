import AppDataSource from "../data-source";
import { user } from "../entities";
import { likes } from "../entities/likes";
import { AppError } from "../errors/AppError";
import getDistance from "./distance.utils";

export default async function searchMatchs (serchUser: any, reqUser: any) {
  const userRepository = AppDataSource.getRepository(user);

  const likesRepository = AppDataSource.getRepository(likes);

  const userFind = await userRepository.findOneBy({ id: serchUser });
    if (!userFind) {
        return "undefined"
    }

    userFind?.likes.forEach(async (forSearchUser: any) => {
      if (forSearchUser?.status === true) {
        const { id, name, age, profile, userAdditionalData } =
        userFind;

        const requestUserlocation = {
          lat: userFind?.location?.split("/")[0],
          lng: userFind?.location?.split("/")[1],
        };

        const sendUserLocation = {
          lat: forSearchUser?.user?.location?.split("/")[0],
          lng: forSearchUser?.user?.location?.split("/")[1],
        };

        const distance = Number(
          getDistance(requestUserlocation, sendUserLocation)
        );

        let modulateProfile: any = { orientation: "", gender: "" };

        const objectProfile: any = forSearchUser?.user?.profile;

        for (const keys in objectProfile) {
          if (keys !== "lookingFor") {
            modulateProfile[`${keys}`] = objectProfile[keys];
          }
        }

        const modulateUser = {
          id,
          name,
          age,
          images: profile?.images,
          additionalData: userAdditionalData,
          profile: modulateProfile,
          distance,
        };

        return "modulateUser";
      }
    });
    return "undefined"
}


    // userFind?.likes.forEach(async (forSearchUser: any) => {
    //   if (forSearchUser.status) {
    //     const { id, name, age, profile, userAdditionalData } =
    //     userFind;

    //     const requestUserlocation = {
    //       lat: userFind?.location?.split("/")[0],
    //       lng: userFind?.location?.split("/")[1],
    //     };

    //     const sendUserLocation = {
    //       lat: forSearchUser?.user?.location?.split("/")[0],
    //       lng: forSearchUser?.user?.location?.split("/")[1],
    //     };

    //     const distance = Number(
    //       getDistance(requestUserlocation, sendUserLocation)
    //     );

    //     let modulateProfile: any = { orientation: "", gender: "" };

    //     const objectProfile: any = forSearchUser?.user?.profile;

    //     for (const keys in objectProfile) {
    //       if (keys !== "lookingFor") {
    //         modulateProfile[`${keys}`] = objectProfile[keys];
    //       }
    //     }

    //     const modulateUser = {
    //       id,
    //       name,
    //       age,
    //       images: profile?.images,
    //       additionalData: userAdditionalData,
    //       profile: modulateProfile,
    //       distance: () => (distance === NaN ? null : distance),
    //     };

    //     return modulateUser;
    //   }
    // });
    // if (serchUserData !== undefined) {
    // }