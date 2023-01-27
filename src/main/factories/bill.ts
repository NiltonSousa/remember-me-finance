import { InsertBillController } from "../../presentation/controllers/bill/insert-bill";
import { DbInsertBill } from "../../data/insert-bill/db-insert-bill";
import { InsertBillSqliteRepository } from "../../infra/db/postgresql/bill-repository/insert-bill";

export const makeInsertBillController = (): InsertBillController => {
  const billSqliteRepository = new InsertBillSqliteRepository();

  const dbInsertBill = new DbInsertBill(billSqliteRepository);

  return new InsertBillController(dbInsertBill);
};
