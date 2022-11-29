import { NotificationModel } from "../models/index";

export interface InsertNotificationModel {
  billId: string;
  type: string;
  message: string;
}

export interface InsertNotification {
  insert(notification: InsertNotificationModel): Promise<NotificationModel>;
}
