import { InsertBillController } from "../../presentation/controllers/bill/insert-bill";
import { DbInsertBill } from "../../data/insert-bill/db-insert-bill";
import { InsertBillSqliteRepository } from "../../infra/db/postgresql/bill-repository/insert-bill";
import { ListBillController } from "../../presentation/controllers/bill";
import { ListBillSqliteRepository } from "../../infra/db/postgresql/bill-repository/list-bill";
import { DbListBill } from "../../data/list-bill/db-list-bill";
import { DeleteBillController } from "../../presentation/controllers/bill/delete-bill";
import { DeleteBillSqliteRepository } from "../../infra/db/postgresql/bill-repository/delete-bill";
import { DbDeleteBill } from "../../data/delete-bill/db-delete-bill";
import { UpdateBillSqliteRepository } from "../../infra/db/postgresql/bill-repository/update-bill";
import { UpdateBillController } from "../../presentation/controllers/bill/update-bill";
import { DbUpdateBill } from "../../data/update-bill/db-update-bill";

export const makeInsertBillController = (): InsertBillController => {
  const billSqliteRepository = new InsertBillSqliteRepository();

  const dbInsertBill = new DbInsertBill(billSqliteRepository);

  return new InsertBillController(dbInsertBill);
};

export const makeUpdateBillController = (): UpdateBillController => {
  const billSqliteRepository = new UpdateBillSqliteRepository();

  const dbUpdateBill = new DbUpdateBill(billSqliteRepository);

  return new UpdateBillController(dbUpdateBill);
};

export const makeListBillController = (): ListBillController => {
  const billSqliteRepository = new ListBillSqliteRepository();

  const dbListBill = new DbListBill(billSqliteRepository);

  return new ListBillController(dbListBill);
};

export const makeDeleteBillController = (): DeleteBillController => {
  const billSqliteRepository = new DeleteBillSqliteRepository();

  const dbListBill = new DbDeleteBill(billSqliteRepository);

  return new DeleteBillController(dbListBill);
};
