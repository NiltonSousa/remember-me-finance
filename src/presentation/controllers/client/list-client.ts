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
      const { clientId, email } = httpRequest.queryParams;

      const client = await this.listClient.list(clientId, email);

      return ok(client);
    } catch (error) {
      return serverError();
    }
  }
}
