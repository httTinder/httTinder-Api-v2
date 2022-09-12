import { Router } from "express";
import { verifyAuthMiddleware } from "../middlewares/auth.middleware";
import { verifyActiveMiddleware } from "../middlewares/verifyActive.middleware";

const matchRoutes = Router();

matchRoutes.get(
  "",
  verifyAuthMiddleware,
  verifyActiveMiddleware,
);

export default matchRoutes;
