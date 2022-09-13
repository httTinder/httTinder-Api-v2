import AppDataSource from "../../data-source";

import { user } from "../../entities";
import { AppError } from "../../errors/AppError";

import { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

import { IUserRequest } from "../../interfaces/user";

import "dotenv/config";
import sendEmail from "../../utils/nodemailer.util";
import { htmlBody } from "../../html";

const createUserService = async ({
  age,
  email,
  name,
  password,
  isAdm = false,
}: IUserRequest): Promise<user> => {
  if (!age || !email || !name || !password) {
    throw new AppError(
      400,
      "Review required fields: { name, email, password, age }"
    );
  }

  if (typeof isAdm !== "boolean") {
    throw new AppError(400, "isAdm field must be a boolean ");
  }

  const userRepository = AppDataSource.getRepository(user);

  const emailExist = await userRepository.findOneBy({ email });

  if (emailExist) {
    throw new AppError(409, "Email already exists");
  }

  if (Number(age) === NaN) {
    throw new AppError(400, "Age must be a numbar");
  }

  if (Number(age) < 18) {
    throw new AppError(406, "Must be over the age of 18");
  }
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\.*])(?=.{8,})/;
  if (!regexPassword.test(password)) {
    throw new AppError(
      400,
      "The password must contain 8 characters, an uppercase, a lowercase, a number and a special character"
    );
  }
  const hashedPassword = await hash(password, 10);

  const newUser = userRepository.create({
    age,
    email,
    name,
    password: hashedPassword,
    isAdm,
    isActive: false,
  });

  await userRepository.save(newUser);

  const token = jwt.sign(
    {
      isActive: newUser.isActive,
    },
    process.env.SECRET_KEY as string,
    {
      subject: newUser.id,
      expiresIn: "24h",
    }
  );
  const html = htmlBody(token);
  sendEmail({ to: email, subject: "Confirm your email", html });

  return newUser;
};

export default createUserService;
