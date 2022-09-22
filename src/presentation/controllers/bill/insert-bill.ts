import { InsertBill } from "../../../domain/usecases/insert-bill";
import { MissingParamError } from "../../errors/missing-param-error";
import { badResquest } from "../../helpers/http-helper";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/http";

export class InsertBillController implements Controller {
  private readonly insertBill: InsertBill;

  constructor(insertBill: InsertBill) {
    this.insertBill = insertBill;
  }

  async handle(httpRequest: HttpRequest) {
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

    return {
      statusCode: 200,
      body: bill,
    };
  }
}
