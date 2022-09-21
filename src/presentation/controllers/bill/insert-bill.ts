import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class InsertBillController implements Controller {
  async handle(httpRequest: HttpRequest) {
    return verifyFields(httpRequest);
  }
}

function verifyFields(httpRequest: HttpRequest) {
  const requiredFields = ["name", "value", "expireDate", "daysBeforeRemember"];

  for (const field of requiredFields) {
    if (!httpRequest.body[field])
      return {
        statusCode: 400,
        body: `param ${field} is not provided`,
      };
  }
}
