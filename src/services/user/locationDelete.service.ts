import AppDataSource from "../../data-source";
import { user } from "../../entities";
import { AppError } from "../../errors/AppError";

export const locationDeleteService = async (userId: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(user);

  const userDelete = await userRepository.findOneBy({ id: userId });

  if (!userDelete) {
    throw new AppError(404, "User not found");
  }

  await userRepository.update(userDelete!.id, { location : "null" });

  return;
};
