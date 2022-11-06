import { ListBill } from "../../../domain/usecases/index";
import { MissingParamError } from "../../errors/missing-param-error";
import { badResquest, ok, serverError } from "../../helpers/http-helper";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/http";

export class ListBillController implements Controller {
  private readonly listBill: ListBill;

  constructor(listBill: ListBill) {
    this.listBill = listBill;
  }

  async handle(httpRequest: HttpRequest) {
    try {
      const requiredFields = ["clientId"];

      for (const field of requiredFields) {
        if (!httpRequest.queryParams[field])
          return badResquest(new MissingParamError(field));
      }

      const { clientId } = httpRequest.queryParams;

      const bill = await this.listBill.list(clientId);

      return ok(bill);
    } catch (error) {
      return serverError();
    }
  }
}
