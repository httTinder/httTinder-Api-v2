import { Response, Request } from "express";
import deleteMatchSevice from "../../services/match/deleteMatch.service";

export default async function deleteMatchController(req: Request, res: Response) {
  const receveirId = req.params.id;

  const requestId = req.user.id

  const message = await deleteMatchSevice(receveirId, requestId);

  return res.json({ message });
}
