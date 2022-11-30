import { badResquest } from ".";
import { MissingParamError } from "../errors";
import { HttpRequest } from "../protocols";

export function validateFields(
  requiredFields: string[],
  httpRequest: HttpRequest
) {
  for (const field of requiredFields) {
    if (!httpRequest.body[field])
      return badResquest(new MissingParamError(field));
  }
}
