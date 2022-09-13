import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { user } from "../../entities";
import { AppError } from "../../errors/AppError";

export const userResetPasswordService = async (
  userId: string,
  newPassword: string
) => {
  const userRepository = AppDataSource.getRepository(user);

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError(404, "User not found");
  }

  const hashedPassword = await hash(newPassword, 10);

  await userRepository.update(findUser!.id, {
    password: hashedPassword,
  });

  return true;
};
