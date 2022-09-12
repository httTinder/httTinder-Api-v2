import { Request, Response } from "express";
import { sendEmailTokenService } from "../../../services/resetPassword/sendEmailToken.service";

export const sendEmailTokenController = async (req: Request, res: Response) => {
  const data = req.body;

  await sendEmailTokenService(data);

  res.json({ message: "Token send to registred email" });
};
