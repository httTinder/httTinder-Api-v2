import jwt from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { user } from "../../entities";
import { AppError } from "../../errors/AppError";
import sendEmail from "../../utils/nodemailer.util";

export const sendEmailTokenService = async (email: string) => {
  const userRepository = AppDataSource.getRepository(user);
  console.log(email)
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

  sendEmail({ to: email, subject: "Confirm to your reset password", text: token });

  return token;
};
