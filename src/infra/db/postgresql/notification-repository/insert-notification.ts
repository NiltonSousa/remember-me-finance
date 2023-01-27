import {
  DbInsertNotificationModel,
  InsertNotificationRepository,
} from "../../../../data/protocols/index";
import { SqliteHelper } from "../helpers/sqlite-helper";
import ShortUniqueId from "short-unique-id";
import { NotificationModel } from "../../../../domain/models";
import { map } from "./notification-mapper";

export class InsertNotificationSqliteRepository
  implements InsertNotificationRepository
{
  async insert(
    notification: DbInsertNotificationModel
  ): Promise<NotificationModel> {
    const generateId = new ShortUniqueId({ length: 6 });
    const code = String(generateId()).toUpperCase();
    await SqliteHelper.createNotification(notification);

    return map(notification, code);
  }
}
