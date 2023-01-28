import { DbInsertClient } from "../../data/insert-client/db-insert-client";
import { InsertClientSqliteRepository } from "../../infra/db/postgresql/client-repository/insert-client";
import { InsertClientController } from "../../presentation/controllers/client/insert-client";

export const makeInsertClientController = (): InsertClientController => {
  const clientSqliteRepository = new InsertClientSqliteRepository();

  const dbInsertClient = new DbInsertClient(clientSqliteRepository);

  return new InsertClientController(dbInsertClient);
};
