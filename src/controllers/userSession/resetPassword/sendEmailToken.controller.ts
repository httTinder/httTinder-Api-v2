import { Request, Response } from "express";
import { sendEmailTokenService } from "../../../services/resetPassword/sendEmailToken.service";

export const sendEmailTokenController = async (req: Request, res: Response) => {
  const { email } = req.body;

  await sendEmailTokenService(email);

  res.json({ message: "Token send to registred email" });
};
