import AppDataSource from "../../data-source";
import { user } from "../../entities";
import { AppError } from "../../errors/AppError";

export const locationUpdateService = async (
  location: string,
  userId: string
): Promise<void> => {
  if (!location) {
    throw new AppError(400, "Review required fields");
  }

  const regexLocation =
    /[-+][1-9]?[0-9][.][0-9][0-9][0-9][0-9][0-9][/][-+][1]?[0-9]?[0-9][.][0-9][0-9][0-9][0-9][0-9]/;

  if (!regexLocation.test(location)) {
    throw new AppError(400, "Review required format of location, long / lat");
  }

  if (Math.abs(Number(location.split("/")[0])) > 90) {
    throw new AppError(400, "maximum longitude is +-90");
  }

  if (Math.abs(Number(location.split("/")[1])) > 180) {
    throw new AppError(400, "maximum latitude is +-180");
  }

  const userRepository = AppDataSource.getRepository(user);

  const findUser = await userRepository.findOneBy({ id: userId });

  if (!findUser) {
    throw new AppError(404, "user not found");
  }

  userRepository.update(userId, { location });

  return;
};
