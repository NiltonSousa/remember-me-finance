import { ListClientRepository } from "../../../../data/protocols/index";
import { ClientModel } from "../../../../domain/models";
import { SqliteHelper } from "../helpers/sqlite-helper";

export class ListClientSqliteRepository implements ListClientRepository {
  async list(clientId?: string, email?: string): Promise<Array<ClientModel>> {
    return await SqliteHelper.listClient(clientId, email);
  }
}
