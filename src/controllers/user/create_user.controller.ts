import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";

import { IUserRequest } from "../../interfaces/user";

import createUserService from "../../services/user/create_user.service";

const createUserController = async (req: Request, res: Response) => {
  const { age, email, name, password, isAdm }: IUserRequest = req.body;

  if (req.body.isAdmin !== undefined) {
    throw new AppError(400, "isAdmin field not exist");
  }
  await createUserService({
    age,
    email,
    name,
    password,
    isAdm,
  });

  return res
    .status(201)
    .json(instanceToPlain({ message: "user created successfully" }));
};

export default createUserController;
