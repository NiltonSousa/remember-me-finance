import { NotificationModel } from "../../domain/models";
import { DbInsertNotificationModel } from "./index";

export interface InsertNotificationRepository {
  insert(notification: DbInsertNotificationModel): Promise<NotificationModel>;
}
