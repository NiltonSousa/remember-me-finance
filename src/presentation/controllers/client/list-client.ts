import { ListClient } from "../../../domain/usecases/index";
import { MissingParamError } from "../../errors/missing-param-error";
import { badResquest, ok, serverError } from "../../helpers/http-helper";
import { Controller } from "../../protocols/controller";
import { HttpRequest } from "../../protocols/http";

export class ListClientController implements Controller {
  private readonly listClient: ListClient;

  constructor(listClient: ListClient) {
    this.listClient = listClient;
  }

  async handle(httpRequest: HttpRequest) {
    try {
      const requiredFields = ["clientId"];

      for (const field of requiredFields) {
        if (!httpRequest.queryParams[field])
          return badResquest(new MissingParamError(field));
      }

      const { clientId } = httpRequest.queryParams;

      const client = await this.listClient.list(clientId);

      return ok(client);
    } catch (error) {
      return serverError();
    }
  }
}
