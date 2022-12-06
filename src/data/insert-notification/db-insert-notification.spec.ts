import { NotificationModel } from "../../domain/models";
import {
  DbInsertNotificationModel,
  InsertNotificationRepository,
} from "../protocols";
import { DbInsertNotification } from "./db-insert-notification";

export interface SutTypes {
  sut: DbInsertNotification;
  insertNotificationRepositoryStub: InsertNotificationRepository;
}

describe("DbInsertNotification usecase", () => {
  const makeInsertNotificationRepository = () => {
    class InsertNotificationRepositoryStub
      implements InsertNotificationRepository
    {
      async insert(
        notification: DbInsertNotificationModel
      ): Promise<NotificationModel> {
        const fakeNotification = {
          id: "valid_id",
          billId: "valid_id",
          type: "valid_type",
          message: "hello_world",
        };
        return new Promise((resolve) => resolve(fakeNotification));
      }
    }

    return new InsertNotificationRepositoryStub();
  };

  const makeSut = (): SutTypes => {
    const insertNotificationRepositoryStub = makeInsertNotificationRepository();
    const sut = new DbInsertNotification(insertNotificationRepositoryStub);

    return {
      sut,
      insertNotificationRepositoryStub,
    };
  };

  it("Should throw if InsertNotificationRepository throws", async () => {
    const { sut, insertNotificationRepositoryStub } = makeSut();
    const notificationData = {
      id: "valid_id",
      billId: "valid_id",
      type: "valid_type",
      message: "hello_world",
    };

    jest
      .spyOn(insertNotificationRepositoryStub, "insert")
      .mockImplementation(
        () => new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.insert(notificationData);

    await expect(promise).rejects.toThrow();
  });
});
