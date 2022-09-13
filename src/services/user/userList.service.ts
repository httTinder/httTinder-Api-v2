import { AppError } from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { user } from "../../entities/index";
import { Request, Response } from "express";
import { likes } from "../../entities/likes";
import getDistance from "../../utils/distance.utils";
import searchMatchs from "../../utils/serchMatchs.util";
import { type } from "os";

const userListService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(user);

  const likesRepository = AppDataSource.getRepository(likes);

  const userFind = await userRepository.findOne({
    where: { id },
    relations: { likes: true },
  });

  if (!userFind) {
    throw new AppError(404, "User not found");
  }

  const sendUserIds: any = [];

  // const findReceivedLikes = await likesRepository.findOne({
  //   where: { receiver: id },
  // });

  userFind?.likes.forEach(async (reqUser: any) => {
    if (reqUser.status) {
      sendUserIds.push(reqUser.receiver);
    }
  });

  const sendUsers: any = [];

  const AllUsers = await userRepository.find();

  const AllLikes = await likesRepository.find();

  sendUserIds.forEach((serchUser: any) => {
    AllUsers.forEach((allUsers: any) => {
      AllLikes.forEach((searchLikes: any) => {
        if (
          allUsers.id == serchUser &&
          searchLikes.receiver == id &&
          searchLikes.status === true
        ) {
          const { id, name, age, profile, userAdditionalData } = allUsers;

          const requestUserlocation = {
            lat: userFind?.location?.split("/")[0],
            lng: userFind?.location?.split("/")[1],
          };

          const sendUserLocation = {
            lat: allUsers?.location?.split("/")[0],
            lng: allUsers?.location?.split("/")[1],
          };

          let distance: number | string = Number(
            getDistance(requestUserlocation, sendUserLocation)
          );
          let modulateProfile: any = {};

          const objectProfile: any = allUsers?.profile;

          for (const keys in objectProfile) {
            if (keys !== "lookingFor") {
              modulateProfile[`${keys}`] = objectProfile[keys];
            }
          }

          if (distance == 0) {
            distance = "<1";
          }

          const newDate = new Date();

          const lastWeek = `${newDate.getFullYear()}-${
            newDate.getMonth() + 1
          }-${newDate.getDate() - 7}`;

          const sessions = [...allUsers.sessions]

          const date = sessions[sessions.length-1]["createdAt"]

          const lastSession = sessions[sessions.length-1]["createdAt"]

          const lastSessionFormat = `${lastSession.getFullYear()}-${lastSession.getMonth()+1}-${lastSession.getDate()}`

          const acitive = lastWeek >= lastSessionFormat

          const modulateUser = {
            id,
            name,
            age,
            images: profile?.images,
            additionalData: userAdditionalData,
            profile: modulateProfile,
            distance,
            acitive,
          }

          sendUsers.push(modulateUser);
        }
      });
    });
  });

  const modulateUser = {
    name: userFind.name,
    email: userFind.email,
    age: userFind.age,
    address: userFind.address,
    profile: userFind.profile,
    userAdditionalData: userFind.userAdditionalData,
    matchs: sendUserIds,
  };

  return { userData: modulateUser, matchs: sendUsers };
};

export default userListService;
