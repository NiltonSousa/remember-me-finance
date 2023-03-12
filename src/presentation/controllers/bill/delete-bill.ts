import { DeleteBill } from "../../../domain/usecases";
import { MissingParamError } from "../../errors/missing-param-error";
import { validateQueryFields } from "../../helpers";
import { badResquest, ok, serverError } from "../../helpers/http-helper";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/http";

export class DeleteBillController implements Controller {
  private readonly deleteBill: DeleteBill;

  constructor(deleteBill: DeleteBill) {
    this.deleteBill = deleteBill;
  }

  async handle(httpRequest: HttpRequest) {
    try {
      const requiredFields = ["billId"];

      const field = await validateQueryFields(requiredFields, httpRequest);

      if (field) return badResquest(new MissingParamError(field));

      const { billId } = httpRequest.queryParams;

      const bill = await this.deleteBill.delete(billId);

      return ok(bill);
    } catch (error) {
      return serverError();
    }
  }
}
