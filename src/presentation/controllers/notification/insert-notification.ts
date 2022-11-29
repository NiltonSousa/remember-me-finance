import { InsertNotification } from "../../../domain/usecases";
import { serverError } from "../../helpers/http-helper";
import { Controller, HttpRequest } from "../../protocols";

export class InsertNotificationController implements Controller {
  private readonly insertNotification: InsertNotification;

  constructor(insertNotification: InsertNotification) {
    this.insertNotification = insertNotification;
  }

  async handle(httpRequest: HttpRequest) {
    return {
      statusCode: 500,
      body: serverError(),
    };
  }
}
