import { DbInsertClient } from "../../data/insert-client/db-insert-client";
import { DbListClient } from "../../data/list-client/db-list-client";
import { InsertClientSqliteRepository } from "../../infra/db/postgresql/client-repository/insert-client";
import { ListClientSqliteRepository } from "../../infra/db/postgresql/client-repository/list-client";
import { InsertClientController } from "../../presentation/controllers/client/insert-client";
import { ListClientController } from "../../presentation/controllers/client/list-client";

export const makeInsertClientController = (): InsertClientController => {
  const clientSqliteRepository = new InsertClientSqliteRepository();

  const dbInsertClient = new DbInsertClient(clientSqliteRepository);

  return new InsertClientController(dbInsertClient);
};

export const makeListClientController = (): ListClientController => {
  const clientSqliteRepository = new ListClientSqliteRepository();

  const dbListClient = new DbListClient(clientSqliteRepository);

  return new ListClientController(dbListClient);
};
