import jwt from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { user } from "../../entities";
import { AppError } from "../../errors/AppError";
import { htmlBody } from "../../html";
import sendEmail from "../../utils/nodemailer.util";

export const sendEmailTokenService = async (email: string) => {
  const userRepository = AppDataSource.getRepository(user);
  console.log(email);
  const findUser = await userRepository.findOne({
    where: {
      email: email,
    },
  });

  if (!findUser) {
    throw new AppError(404, "Email not found");
  }

  const token = jwt.sign(
    {
      email: findUser.email,
    },
    process.env.SECRET_KEY as string,
    {
      subject: findUser.id,
      expiresIn: "4h",
    }
  );

  const html = htmlBody(
    token,
    "Click on the button to confirm you token!",
    true
  );
  sendEmail({ to: email, subject: "Confirm your token", html });

  return token;
};
