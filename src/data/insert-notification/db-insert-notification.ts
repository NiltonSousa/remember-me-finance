import { NotificationModel } from "../../domain/models";
import {
  DbInsertNotificationModel,
  InsertNotificationModel,
  InsertNotificationRepository,
} from "../protocols";

export class DbInsertNotification implements InsertNotificationModel {
  private readonly insertNotificationRepository: InsertNotificationRepository;

  constructor(insertNotificationRepository: InsertNotificationRepository) {
    this.insertNotificationRepository = insertNotificationRepository;
  }

  async insert(
    notificationData: DbInsertNotificationModel
  ): Promise<NotificationModel> {
    return await this.insertNotificationRepository.insert(notificationData);
  }
}
