import { Response, Request } from "express";
import sendLikeSevice from "../../services/match/sendLike.service";

export default async function sendLikeController(req: Request, res: Response) {
  const receveirId = req.params.id;

  const requestId = req.user.id

  const message = await sendLikeSevice(receveirId, requestId);

  return res.json({ message });
}
