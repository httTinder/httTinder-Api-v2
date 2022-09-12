import { Response, Request } from "express";

export default async function matchController (req: Request, res: Response) {
  const userId = req.params.id;

  await (userId);

  return res.json({ message: "Your email has been successfully confirmed" });
}
