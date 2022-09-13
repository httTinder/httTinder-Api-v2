import { Request, Response } from "express";
import { userResetPasswordService } from "../../../services/resetPassword/userResetPassword.service";

export const userResetPasswordController = async (
  req: Request,
  res: Response
) => {
  const { newPassword } = req.body;
  const id = req.user.id;

  await userResetPasswordService(id, newPassword);

  return res.json({ message: "Password Updated" });
};
