import { InsertRating } from "../../../domain/usecases";
import { MissingParamError } from "../../errors";
import { badResquest, ok, serverError, validateFields } from "../../helpers";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class InsertRatingController implements Controller {
  private readonly insertRating: InsertRating;

  constructor(insertRating: InsertRating) {
    this.insertRating = insertRating;
  }

  async handle(httpRequest: HttpRequest) {
    try {
      const requiredFields = ["clientId", "grade"];

      const field = await validateFields(requiredFields, httpRequest);

      if (field) return badResquest(new MissingParamError(field));

      const { clientId, grade } = httpRequest.body;

      const rating = await this.insertRating.insert({
        clientId,
        grade,
      });

      return ok(rating);
    } catch (e) {
      console.log(e);
      return serverError();
    }
  }
}
