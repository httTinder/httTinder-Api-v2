import AppDataSource from "../../data-source";
import { user } from "../../entities";
import { likes } from "../../entities/likes";
import { AppError } from "../../errors/AppError";
import getDistance from "../../utils/distance.utils";
import AlgMatch from "../../utils/match.utils";

export default async function sendLikeSevice(
  receveirId: string,
  requestId: string
) : Promise<string> {
  let message = "the like was registered"
  if (receveirId == requestId) {
    throw new AppError(400, "requesting user and receiver as are the same");
  }

  const userRepository = AppDataSource.getRepository(user);

  const likesRepository = AppDataSource.getRepository(likes);

  const requestUser: any = await userRepository.findOne({
    where: { id: requestId },
    relations: { likes: true },
  });

  if (!requestUser) {
    throw new AppError(404, "user who sent the like was not found");
  }

  const receiverUser = await userRepository.findOne({
    where: { id: receveirId },
    relations: { likes: true },
  });

  if (!receiverUser) {
    throw new AppError(404, "user who received the like was not found");
  }

  requestUser?.likes?.forEach((recUserId : any) => {
    if (recUserId?.received === receveirId) {
      throw new AppError(404, "the like has already been sent to this user");
    }
  });

  receiverUser?.likes?.forEach((reqUserId : any) => {
    if (reqUserId?.received === requestId) {
      message = "It´s a match!"
    }
  })

  
  
  // const createReqLike = likesRepository.create({ receiver : receveirId, status: true, user : requestUser})
  
  // if (!requestUser?.likes) {
  //   await likesRepository.update(requestUser, {receiver : receveirId, status: true})
  // }

  // await likesRepository.save(createReqLike)

  // const createRecLike = likesRepository.create({ receiver : requestId, user : receiverUser})

  // if (!receiverUser?.likes) {
  //   await likesRepository.update(receiverUser, {receiver : requestUser})
  // }

  // await likesRepository.save(createRecLike)

  return message
}
