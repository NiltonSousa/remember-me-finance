import { InsertBill } from "../../../domain/usecases/insert-bill";
import { MissingParamError } from "../../errors/missing-param-error";
import { badResquest, ok } from "../../helpers/http-helper";
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
        "name",
        "value",
        "expireDate",
        "daysBeforeExpireDateToRemember",
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field])
          return badResquest(new MissingParamError(field));
      }

      const { name, value, expireDate, daysBeforeExpireDateToRemember } =
        httpRequest.body;

      const bill = await this.insertBill.insert({
        name,
        value,
        expireDate,
        daysBeforeExpireDateToRemember,
      });

      return ok(bill);
    } catch (error) {
      return {
        statusCode: 500,
        body: new Error("Internal server error"),
      };
    }
  }
}
