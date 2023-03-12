import { ClientModel } from "../../domain/models";

export interface ListClientRepository {
  list(clientId?: string, email?: string): Promise<Array<ClientModel>>;
}
