import { Express } from "express";
import { billRouter } from "../routes/bill-routes";
import { clientRouter } from "../routes/client-routes";
import { notificationRouter } from "../routes/notification-routes";
import { ratingRouter } from "../routes/rating-routes";
import { authRouter } from "../routes/auth-routes";

export default (app: Express): void => {
  app.use(billRouter);
  app.use(clientRouter);
  app.use(ratingRouter);
  app.use(notificationRouter);
  app.use(authRouter);
};
