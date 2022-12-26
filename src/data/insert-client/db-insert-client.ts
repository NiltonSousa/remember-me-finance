import { ClientModel } from "../../domain/models";
import {
  DbInsertClientModel,
  InsertClientModel,
  InsertClientRepository,
} from "../protocols";

export class DbInsertClient implements InsertClientModel {
  private readonly insertClientRepository: InsertClientRepository;

  constructor(insertClientRepository: InsertClientRepository) {
    this.insertClientRepository = insertClientRepository;
  }

  async insert(client: DbInsertClientModel): Promise<ClientModel> {
    return this.insertClientRepository.insert(client);
  }
}
