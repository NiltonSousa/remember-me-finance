import { ClientModel } from "../../domain/models";
import { ListClientModel, ListClientRepository } from "../protocols/index";

export class DbListClient implements ListClientModel {
  private readonly listClientRepository: ListClientRepository;

  constructor(listClientRepository: ListClientRepository) {
    this.listClientRepository = listClientRepository;
  }

  async list(clientId: string): Promise<Array<ClientModel>> {
    return await this.listClientRepository.list(clientId);
  }
}
