import { Express } from "express";
import { billRouter } from "../routes/bill-routes";

export default (app: Express): void => {
  app.use(billRouter);
};
