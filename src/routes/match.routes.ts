import { Router } from "express";
import matchController from "../controllers/match/match.controller";
import sendLikeController from "../controllers/match/sendLike.controller";
import { verifyAuthMiddleware } from "../middlewares/auth.middleware";
import { verifyActiveMiddleware } from "../middlewares/verifyActive.middleware";

const matchRoutes = Router();

matchRoutes.get(
  "",
  verifyAuthMiddleware,
  verifyActiveMiddleware,
  matchController
);

matchRoutes.post(
  "/like/:id",
  verifyAuthMiddleware,
  verifyActiveMiddleware,
  sendLikeController
)

export default matchRoutes;
