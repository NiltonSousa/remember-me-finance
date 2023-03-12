import { ok, serverError, unauthorized } from "../../helpers/http-helper";
import { Controller } from "../../protocols";
import { HttpRequest } from "../../protocols/http";
import jwt from "jsonwebtoken";

export class VerifyPasswordAuthController implements Controller {
  async handle(httpRequest: HttpRequest) {
    try {
      const { encryptedPassword, passwordToCompare } = httpRequest.queryParams;

      const formatedPassword = jwt.sign(
        passwordToCompare,
        process.env.JWT_SECRET!
      );

      if (encryptedPassword === formatedPassword) {
        return ok({ authorized: true });
      } else {
        return unauthorized({ authorized: false });
      }
    } catch (error) {
      return serverError();
    }
  }
}
