import { Router } from "express";
import { sendEmailTokenController } from "../controllers/userSession/resetPassword/sendEmailToken.controller";
import { userConfirmTokenController } from "../controllers/userSession/resetPassword/userConfirmToken.controller";
import { userResetPasswordController } from "../controllers/userSession/resetPassword/userResetPassword.controller";
import { activateUserMiddleware } from "../middlewares/activateUser.middleware";

const resetRoutes = Router();

resetRoutes.post("", sendEmailTokenController);
resetRoutes.post(
  "/resetPassword/:tokenEmail",
  activateUserMiddleware,
  userConfirmTokenController
);

resetRoutes.patch("/resetPassword/:tokenEmail/newPassword", activateUserMiddleware,userResetPasswordController)


export default resetRoutes;
