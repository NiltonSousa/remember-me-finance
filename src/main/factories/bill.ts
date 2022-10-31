import { InsertBillController } from "../../presentation/controllers/bill/insert-bill";
import { DbInsertBill } from "../../data/insert-bill/db-insert-bill";
import { BillSqliteRepository } from "../../infra/db/sqlite/bill-repository/bill";

export const makeInsertBillController = (): InsertBillController => {
  const billSqliteRepository = new BillSqliteRepository();

  const dbInsertBill = new DbInsertBill(billSqliteRepository);

  return new InsertBillController(dbInsertBill);
};
