import { DbInsertNotificationModel } from "../../../../data/protocols";
import { NotificationModel } from "../../../../domain/models";

export const map = (
  notificationData: DbInsertNotificationModel,
  generatedId: string
): Promise<NotificationModel> => {
  const { billId, type, message } = notificationData;

  return new Promise((resolve) =>
    resolve({
      id: generatedId,
      billId,
      type,
      message,
    })
  );
};
