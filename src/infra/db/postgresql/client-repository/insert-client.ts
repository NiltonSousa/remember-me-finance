import {
  DbInsertClientModel,
  InsertClientRepository,
} from "../../../../data/protocols/index";
import { SqliteHelper } from "../helpers/sqlite-helper";
import ShortUniqueId from "short-unique-id";
import { ClientModel } from "../../../../domain/models";
import { map } from "./client-mapper";
import jwt from "jsonwebtoken";

export class InsertClientSqliteRepository implements InsertClientRepository {
  async insert(client: DbInsertClientModel): Promise<ClientModel> {
    let code = "";
    let formatedPass = "";

    if (!client.id) {
      const generateId = new ShortUniqueId({ length: 6 });
      code = String(generateId()).toUpperCase();
    } else {
      code = client.id;
    }

    const {
      name,
      cpf,
      billsCount,
      birthdate,
      email,
      phoneNumber,
      password,
      isAdmin,
    } = client;

    if (password) {
      formatedPass = jwt.sign(password, process.env.JWT_SECRET!);
    }

    await SqliteHelper.createClient(
      code,
      name,
      cpf ?? "",
      birthdate,
      email,
      phoneNumber,
      billsCount,
      formatedPass,
      isAdmin ?? false
    );

    return map(client, code);
  }
}
