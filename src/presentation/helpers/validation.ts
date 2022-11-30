import { HttpRequest } from "../protocols";

export async function validateFields(
  requiredFields: string[],
  httpRequest: HttpRequest
) {
  for (const field of requiredFields) {
    if (!httpRequest.body[field]) return field;
  }
}
