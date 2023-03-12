import { UpdateBill } from "../../../domain/usecases/update-bill";
import { MissingParamError } from "../../errors/missing-param-error";
import { validateFields } from "../../helpers";
import { badResquest, ok, serverError } from "../../helpers/http-helper";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/http";

export class UpdateBillController implements Controller {
  private readonly updateBill: UpdateBill;

  constructor(updateBill: UpdateBill) {
    this.updateBill = updateBill;
  }

  async handle(httpRequest: HttpRequest) {
    try {
      const requiredFields = [
        "id",
        "clientId",
        "name",
        "value",
        "expireDate",
        "daysBeforeExpireDateToRemember",
      ];

      const field = await validateFields(requiredFields, httpRequest);

      if (field) return badResquest(new MissingParamError(field));

      const {
        id,
        clientId,
        name,
        value,
        expireDate,
        daysBeforeExpireDateToRemember,
      } = httpRequest.body;

      const bill = await this.updateBill.update({
        id,
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
