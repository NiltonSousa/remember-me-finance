import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeInsertNotificationController } from "../factories/notification";

export const notificationRouter = Router();
notificationRouter.post("/notification", adaptRoute(makeInsertNotificationController()));
