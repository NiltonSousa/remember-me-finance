import { InsertBill } from "../../../domain/usecases/insert-bill";
import { MissingParamError } from "../../errors/missing-param-error";
import { validateFields } from "../../helpers";
import { badResquest, ok, serverError } from "../../helpers/http-helper";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/http";

export class InsertBillController implements Controller {
  private readonly insertBill: InsertBill;

  constructor(insertBill: InsertBill) {
    this.insertBill = insertBill;
  }

  async handle(httpRequest: HttpRequest) {
    try {
      const requiredFields = [
        "clientId",
        "name",
        "value",
        "expireDate",
        "daysBeforeExpireDateToRemember",
      ];

      validateFields(requiredFields, httpRequest);

      const {
        clientId,
        name,
        value,
        expireDate,
        daysBeforeExpireDateToRemember,
      } = httpRequest.body;

      const bill = await this.insertBill.insert({
        clientId,
        name,
        value,
        expireDate,
        daysBeforeExpireDateToRemember,
      });

      return ok(bill);
    } catch (error) {
      return serverError();
    }
  }
}
