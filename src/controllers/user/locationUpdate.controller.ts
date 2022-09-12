import { Request, Response } from "express";
import { locationUpdateService } from "../../services/user/locationUpdate.service";

export const locationUpdateController = async (
  req: Request,
  res: Response
) => {
  const {location} = req.body;

  const userId = req.idParams.id;

  await locationUpdateService(location, userId);
  
  return res.status(200).json({ message: "Profile update successfully" });
};
