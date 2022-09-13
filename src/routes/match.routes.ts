import { Router } from "express";
import matchController from "../controllers/match/match.controller";
import { verifyAuthMiddleware } from "../middlewares/auth.middleware";
import { verifyActiveMiddleware } from "../middlewares/verifyActive.middleware";

const matchRoutes = Router();

matchRoutes.get(
  "",
  verifyAuthMiddleware,
  verifyActiveMiddleware,
  matchController
);

export default matchRoutes;
