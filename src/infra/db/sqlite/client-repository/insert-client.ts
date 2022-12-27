import {
  DbInsertClientModel,
  InsertClientRepository,
} from "../../../../data/protocols/index";
import { SqliteHelper } from "../helpers/sqlite-helper";
import ShortUniqueId from "short-unique-id";
import { ClientModel } from "../../../../domain/models";
import { map } from "./client-mapper";

export class InsertClientSqliteRepository implements InsertClientRepository {
  async insert(client: DbInsertClientModel): Promise<ClientModel> {
    const generateId = new ShortUniqueId({ length: 6 });
    const code = String(generateId()).toUpperCase();
    const { name, cpf, billsCount, birthdate, email, phoneNumber, id } = client;
    await SqliteHelper.createClient(
      generateId.toString(),
      name,
      cpf ?? "",
      birthdate,
      email,
      phoneNumber,
      billsCount
    );

    return map(client, code);
  }
}
