import { InsertClient } from "../../../domain/usecases";
import { MissingParamError } from "../../errors";
import { badResquest, ok, serverError, validateFields } from "../../helpers";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class InsertClientController implements Controller {
  private readonly insertClient: InsertClient;

  constructor(insertClient: InsertClient) {
    this.insertClient = insertClient;
  }

  async handle(httpRequest: HttpRequest) {
    try {
      const requiredFields = [
        "name",
        "birthdate",
        "email",
        "phoneNumber",
        "billsCount",
      ];

      const field = await validateFields(requiredFields, httpRequest);

      if (field) return badResquest(new MissingParamError(field));

      const {
        id,
        name,
        cpf,
        birthdate,
        email,
        phoneNumber,
        billsCount,
        password,
        isAdmin,
      } = httpRequest.body;

      const client = await this.insertClient.insert({
        id,
        name,
        cpf,
        birthdate,
        email,
        phoneNumber,
        billsCount,
        password,
        isAdmin,
      });

      return ok(client);
    } catch (error) {
      console.log("error-->", error);
      return serverError();
    }
  }
}
