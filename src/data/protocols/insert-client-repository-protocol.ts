import { ClientModel } from "../../domain/models";
import { DbInsertClientModel } from "./index";

export interface InsertClientRepository {
  insert(notification: DbInsertClientModel): Promise<ClientModel>;
}
