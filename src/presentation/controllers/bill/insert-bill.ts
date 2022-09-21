import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class InsertBillController implements Controller {
  async handle(httpRequest: HttpRequest) {
    return {
      statusCode: 400,
      body: "params name is not provided",
    };
  }
}
