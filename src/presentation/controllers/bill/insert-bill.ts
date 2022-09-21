import { MissingParamError } from "../../errors/missing-param-error";
import { badResquest } from "../../helpers/http-helper";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/http";

export class InsertBillController implements Controller {
  async handle(httpRequest: HttpRequest) {
    return verifyFields(httpRequest);
  }
}

function verifyFields(httpRequest: HttpRequest) {
  const requiredFields = ["name", "value", "expireDate", "daysBeforeRemember"];

  for (const field of requiredFields) {
    if (!httpRequest.body[field])
      return badResquest(new MissingParamError(field));
  }
}
