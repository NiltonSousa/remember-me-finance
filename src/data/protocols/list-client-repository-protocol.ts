import { ClientModel } from "../../domain/models";

export interface ListClientRepository {
  list(clientId: string): Promise<Array<ClientModel>>;
}
