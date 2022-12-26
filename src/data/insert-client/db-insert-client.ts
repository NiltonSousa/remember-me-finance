import { InsertClientModel } from "../../domain/usecases";

export class DbInsertClient {
  async insert(client: InsertClientModel) {
    return new Promise((resolve, reject) => reject(new Error()));
  }
}
