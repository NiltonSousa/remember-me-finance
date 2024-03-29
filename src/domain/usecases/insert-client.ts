import { ClientModel } from "../models/index";

export interface InsertClientModel {
  id?: string;
  name: string;
  cpf?: string;
  birthdate: string;
  email: string;
  phoneNumber: string;
  billsCount: string;
  password?: string;
  isAdmin?: boolean;
}

export interface InsertClient {
  insert(client: InsertClientModel): Promise<ClientModel>;
}
