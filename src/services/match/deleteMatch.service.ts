import AppDataSource from "../../data-source";
import { user } from "../../entities";
import { likes } from "../../entities/likes";
import { AppError } from "../../errors/AppError";

export default async function deleteMatchSevice(
  receveirId: string,
  requestId: string
): Promise<string> {
  if (receveirId == requestId) {
    throw new AppError(400, "Requesting user and receiver are the same");
  }

  const userRepository = AppDataSource.getRepository(user);

  const likesRepository = AppDataSource.getRepository(likes);

  const requestUser: any = await userRepository.findOne({
    where: { id: requestId },
    relations: { likes: true },
  });

  if (!requestUser) {
    throw new AppError(404, "User who sent the like was not found");
  }

  const receiverUser = await userRepository.findOne({
    where: { id: receveirId },
    relations: { likes: true },
  });

  if (!receiverUser) {
    throw new AppError(404, "User who received the like was not found");
  }



  const findReqLikes = await likesRepository.findOne({
    where: { id: requestUser.likes.id, receiver: receveirId },
  });

if(!findReqLikes){
    throw new AppError(404, "Match not found.")

}

  await likesRepository.update(findReqLikes.id, { status: false });

  return "Unmatch with successes!";
}
