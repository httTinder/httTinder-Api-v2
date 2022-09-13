import { match } from "assert";
import { Router } from "express";
import deleteMatchController from "../controllers/match/deleteMatch.controllers";
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

matchRoutes.delete(
  "/like/:id",
  verifyAuthMiddleware,
  verifyActiveMiddleware,
  deleteMatchController
)

export default matchRoutes;
