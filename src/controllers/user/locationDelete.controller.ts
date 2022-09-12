import { Request, Response } from "express";
import { locationDeleteService } from "../../services/user/locationDelete.service";
import userDeleteProfileService from "../../services/user/user_profile/delete_user_profile.service";

export const locationDeleteController = async (req: Request, res: Response) => {
  const userId = req.idParams.id;

  await locationDeleteService(userId);

  return res.status(204).json({ message: "Location deleted with sucess!" });
};
