import { ClientModel } from "../models/index";

export interface ListClient {
  list(clientId?: string, email?: string): Promise<Array<ClientModel>>;
}
