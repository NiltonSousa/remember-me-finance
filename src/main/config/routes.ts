import { Express } from "express";
import { billRouter } from "../routes/bill-routes";
import { notificationRouter } from "../routes/notification-routes";

export default (app: Express): void => {
  app.use(billRouter);
  app.use(notificationRouter)
};
