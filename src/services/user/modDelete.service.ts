import AppDataSource from "../../data-source";
import { user } from "../../entities";
import { AppError } from "../../errors/AppError";

export const modDeleteService = async (id: string): Promise<boolean> => {
  const userRepository = AppDataSource.getRepository(user);

  const userDelete = await userRepository.findOneBy({ id });

  if (!userDelete) {
    throw new AppError(404, "User not found");
  }

  await userRepository.delete(userDelete?.id)

  return true
};