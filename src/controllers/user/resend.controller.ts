import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";

import { IUserRequest } from "../../interfaces/user";

import createUserService from "../../services/user/create_user.service";
import { resendService } from "../../services/user/resend.service";

export const resendController = async (req: Request, res: Response) => {
  const email = req.body.email;

  await resendService(email);

  return res
    .status(200)
    .json(instanceToPlain({ message: "the email was resent" }));
};
