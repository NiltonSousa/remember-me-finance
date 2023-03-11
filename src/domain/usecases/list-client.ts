import { ClientModel } from "../models/index";

export interface ListClient {
  list(clientId: string): Promise<ClientModel>;
}
