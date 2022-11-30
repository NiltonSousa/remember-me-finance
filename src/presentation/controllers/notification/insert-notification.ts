import { InsertNotification } from "../../../domain/usecases";
import { MissingParamError } from "../../errors";
import { validateFields } from "../../helpers";
import { badResquest, serverError } from "../../helpers/http-helper";
import { Controller, HttpRequest } from "../../protocols";

export class InsertNotificationController implements Controller {
  private readonly insertNotification: InsertNotification;

  constructor(insertNotification: InsertNotification) {
    this.insertNotification = insertNotification;
  }

  async handle(httpRequest: HttpRequest) {
    const requiredFields = ["billId", "type", "message"];

    const field = await validateFields(requiredFields, httpRequest);

    if (field) return badResquest(new MissingParamError(field));

    return {
      statusCode: 500,
      body: serverError(),
    };
  }
}
