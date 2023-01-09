import { serverError } from "../../helpers";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class InsertRatingController implements Controller {
  async handle(httpRequest: HttpRequest) {
    return serverError();
  }
}
