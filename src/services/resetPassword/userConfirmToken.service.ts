import AppDataSource from "../../data-source";
import { user } from "../../entities";
import { AppError } from "../../errors/AppError";

export const userConfirmTokenService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(user);

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError(404, "User not found");
  }

  return findUser
};
