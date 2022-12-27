import { DbInsertClient } from "../../data/insert-client/db-insert-client";
import { InsertClientSqliteRepository } from "../../infra/db/sqlite/client-repository/insert-client";
import { InsertClientController } from "../../presentation/controllers/client/insert-client";

export const makeInsertClientController = (): InsertClientController => {
  console.log("Entrou");

  const clientSqliteRepository = new InsertClientSqliteRepository();

  const dbInsertClient = new DbInsertClient(clientSqliteRepository);

  return new InsertClientController(dbInsertClient);
};
