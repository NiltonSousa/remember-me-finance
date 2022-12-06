import { NotificationModel } from "../../domain/models";

export interface DbInsertNotificationModel {
  id?: string;
  billId: string;
  type: string;
  message: string;
}

export interface InsertNotificationModel {
  insert(notification: DbInsertNotificationModel): Promise<NotificationModel>;
}
