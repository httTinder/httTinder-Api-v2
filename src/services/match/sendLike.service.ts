import AppDataSource from "../../data-source";
import { user } from "../../entities";
import { likes } from "../../entities/likes";
import { AppError } from "../../errors/AppError";
import getDistance from "../../utils/distance.utils";
import AlgMatch from "../../utils/match.utils";

export default async function sendLikeSevice(
  receveirId: string,
  requestId: string
): Promise<string> {
  if (receveirId == requestId) {
    throw new AppError(400, "requesting user and receiver are the same");
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

  requestUser?.likes?.forEach((recUserId: any) => {
    if (recUserId?.receiver == receveirId && recUserId?.status === true) {
      throw new AppError(404, "the like has already been sent to this user");
    }
  });

  const findReqLikes = await likesRepository.findOne({
    where: { id: requestUser.likes.id, receiver: receveirId },
  });

  if (!findReqLikes) {
    const createReqLike = likesRepository.create({
      receiver: receveirId,
      status: true,
      user: requestUser,
    });

    await likesRepository.save(createReqLike);

    const createRecLike = likesRepository.create({
      receiver: requestId,
      user: receiverUser,
    });

    await likesRepository.save(createRecLike);

    return "the like was registered";
  }

  await likesRepository.update(findReqLikes.id, { status: true });

  return "It´s a match!";
}
