import { Response, Request } from "express";
import matchService from "../../services/match/match.service";

export default async function matchController(req: Request, res: Response) {
  const userId = req.params.id;

  const message = await matchService(userId);

  return res.json({ message });
}
