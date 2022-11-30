import { InsertNotification } from "../../../domain/usecases";
import { MissingParamError } from "../../errors";
import { validateFields } from "../../helpers";
import { badResquest, ok, serverError } from "../../helpers/http-helper";
import { Controller, HttpRequest } from "../../protocols";

export class InsertNotificationController implements Controller {
  private readonly insertNotification: InsertNotification;

  constructor(insertNotification: InsertNotification) {
    this.insertNotification = insertNotification;
  }

  async handle(httpRequest: HttpRequest) {
    try {
      const requiredFields = ["billId", "type", "message"];

      const field = await validateFields(requiredFields, httpRequest);

      if (field) return badResquest(new MissingParamError(field));

      const { billId, type, message } = httpRequest.body;

      const notification = await this.insertNotification.insert({
        billId,
        type,
        message,
      });

      return ok(notification);
    } catch (error) {
      return serverError();
    }
  }
}
