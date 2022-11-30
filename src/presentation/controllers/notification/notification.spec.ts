import { NotificationModel } from "../../../domain/models";
import {
  InsertNotification,
  InsertNotificationModel,
} from "../../../domain/usecases";
import { MissingParamError } from "../../errors";
import { serverError } from "../../helpers/http-helper";
import { InsertNotificationController } from "./insert-notification";

describe("Insert Notification Controller", () => {
  const makeInsertNotification = () => {
    class InsertNotificationStub implements InsertNotification {
      insert(
        notification: InsertNotificationModel
      ): Promise<NotificationModel> {
        const fakeNotification = {
          id: "valid_id",
          billId: "valid_bill_id",
          type: "valid_type",
          message: "hello_world",
        };
        return new Promise((resolve) => resolve(fakeNotification));
      }
    }
    return new InsertNotificationStub();
  };

  const makeSutInsert = () => {
    const insertNotificationStub = makeInsertNotification();

    const sut = new InsertNotificationController(insertNotificationStub);

    return {
      sut,
      insertNotificationStub,
    };
  };

  it("Should return 400 when no billId is provided", async () => {
    const { sut } = makeSutInsert();

    const httpRequest = {
      body: {
        type: "valid_type",
        message: "hello_world",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("billId"));
  });

  it("Should return 500 if InsertNotificationController throws", async () => {
    const { sut } = makeSutInsert();

    const httpRequest = {
      body: {
        billId: "valid_bill_id",
        type: "valid_type",
        message: "hello_world",
      },
    };

    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(serverError());
  });
});
