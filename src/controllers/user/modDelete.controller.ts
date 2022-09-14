import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { modDeleteService } from "../../services/user/modDelete.service";

export const modDeleteController = async (req: Request, res: Response) => {
  const userId = req.params.id

  await modDeleteService(userId);

  return res
    .status(200)
    .json(instanceToPlain({ message: "user deleted" }));
};
