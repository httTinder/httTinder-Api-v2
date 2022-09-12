import AppDataSource from "../../data-source";

import { user } from "../../entities";
import { AppError } from "../../errors/AppError";

import { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

import { IUserRequest } from "../../interfaces/user";

import "dotenv/config";
import sendEmail from "../../utils/nodemailer.util";
import { number } from "yup";

export const resendService = async (email: string): Promise<void> => {
  if (!email) {
    throw new AppError(400, "Review required fields");
  }

  const userRepository = AppDataSource.getRepository(user);

  const findUser = await userRepository.findOneBy({ email });

  if (!findUser) {
    throw new AppError(409, "user not found");
  }

  if (findUser.isActive) {
    throw new AppError(409, "user already active");
  }

  const token = jwt.sign(
    {
      isActive: findUser.isActive,
    },
    process.env.SECRET_KEY as string,
    {
      subject: findUser.id,
      expiresIn: "7d",
    }
  );

  sendEmail({ to: email, subject: "Confirm your email", text: token });

  return;
};
