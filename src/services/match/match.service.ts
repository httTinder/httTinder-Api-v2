import AppDataSource from "../../data-source";
import { user } from "../../entities";
import { AppError } from "../../errors/AppError";
import getDistance from "../../utils/distance.utils";
import AlgMathc from "../../utils/match.utils";

export default async function matchService(userId: string) {
  const userRepository = AppDataSource.getRepository(user);

  const requestUser = await userRepository.findOneBy({ id: userId });

  if (!requestUser) {
    throw new AppError(404, "User not found");
  }

  if (requestUser?.location === undefined) {
    throw new AppError(400, "location must be sent first");
  }

  if (requestUser?.profile?.lookingFor?.id === undefined) {
    throw new AppError(400, "'looking for' must be sent first");
  }

  const allUser = await userRepository.find();

  let usersByScore: any = [];

  allUser.forEach(async (sendUser) => {
    const scoreUser = await AlgMathc(requestUser, sendUser);
    if (scoreUser !== undefined) {
      usersByScore.push(scoreUser);
    }
  });

  const response = usersByScore.sort((a: any, b: any) => b.score - a.score);

  return response;
}
