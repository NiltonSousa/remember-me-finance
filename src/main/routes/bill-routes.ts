import { Router } from "express";

export const billRouter = Router();
billRouter.post("/bill", (req, res) => {
  res.json(req.body);
});
