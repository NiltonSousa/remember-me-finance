import { ClientModel } from "../models/index";

export interface InsertClientModel {
  name: string;
  cpf?: string;
  message: string;
  birthdate: string;
  email: string;
  phoneNumber: string;
  billsCount: string;
}

export interface InsertClient {
  insert(client: InsertClientModel): Promise<ClientModel>;
}
