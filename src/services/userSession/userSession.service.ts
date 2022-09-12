import jwt from "jsonwebtoken";
import { compare, compareSync } from "bcryptjs";
import AppDataSource from "../../data-source";
import { user } from "../../entities";
import { AppError } from "../../errors/AppError";
import { IUserSession } from "../../interfaces/user/userSession";
import { sessions } from "../../entities/sessions";

export const userSessionService = async ({ email, password }: IUserSession) => {
  
  const userRepository = AppDataSource.getRepository(user);

  const sessionRepository = AppDataSource.getRepository(sessions);
  
  const findUser = await userRepository.findOneBy({
    email,
  });
  // throw new AppError(403, "Email or Password not match");

  if (!findUser) {
    throw new AppError(403, "Email or Password not match");
  }

  const verifyPassword = compareSync(password, findUser.password);

  if (!verifyPassword) {
    throw new AppError(403, "Email or Password not match");
  }

  if (!findUser.isActive) {
    throw new AppError(403, "User is not active");
  }

  const token = jwt.sign(
    {
      isAdm: findUser.isAdm,
      isActive: findUser.isActive,
      id: findUser.id,
    },
    process.env.SECRET_KEY as string,
    { expiresIn: "24h", subject: findUser.id }
  );

  const newSession = sessionRepository.create({ user: findUser });

  await sessionRepository.save(newSession);

  return token;
};
