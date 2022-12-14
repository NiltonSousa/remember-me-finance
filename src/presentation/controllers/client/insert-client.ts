import { serverError } from "../../helpers";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class InsertClientController implements Controller {
  async handle(httpRequest: HttpRequest) {
    const httpResponse: HttpResponse = serverError();

    return httpResponse;
  }
}
