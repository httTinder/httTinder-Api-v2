import { Router } from "express";
import { sendEmailTokenController } from "../controllers/userSession/resetPassword/sendEmailToken.controller";

const resetRoutes = Router();

resetRoutes.post("", sendEmailTokenController);

export default resetRoutes;
