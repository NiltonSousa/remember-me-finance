import { Express } from "express";
import { billRouter } from "../routes/bill-routes";
import { clientRouter } from "../routes/client-routes";
import { notificationRouter } from "../routes/notification-routes";

export default (app: Express): void => {
  app.use(billRouter);
  app.use(clientRouter);
  app.use(notificationRouter);
};
