import { InsertNotificationController } from "../../presentation/controllers/notification/insert-notification";
import { InsertNotificationSqliteRepository } from "../../infra/db/sqlite/notification-repository/insert-notification";
import { DbInsertNotification } from "../../data/insert-notification/db-insert-notification";

export const makeInsertNotificationController = (): InsertNotificationController => {
  const notificationSqliteRepository = new InsertNotificationSqliteRepository();

  const dbInsertNotification = new DbInsertNotification(notificationSqliteRepository);

  return new InsertNotificationController(dbInsertNotification);
};
