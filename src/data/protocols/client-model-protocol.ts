import { ClientModel } from "../../domain/models";

export interface DbInsertClientModel {
  id?: string;
  name: string;
  cpf?: string;
  birthdate: string;
  email: string;
  phoneNumber: string;
  billsCount: string;
}

export interface InsertClientModel {
  insert(client: DbInsertClientModel): Promise<ClientModel>;
}

export interface ListClientModel {
  list(clientId: string): Promise<ClientModel>;
}
