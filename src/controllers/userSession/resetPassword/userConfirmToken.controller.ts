import { Request, Response } from "express";
import { userConfirmTokenService } from "../../../services/resetPassword/userConfirmToken.service";

export const userConfirmTokenController = async (
  req: Request,
  res: Response
) => {
  const id = req.user.id;

  await userConfirmTokenService(id);

  return res.json({ message: " Token Accepted" });
};
