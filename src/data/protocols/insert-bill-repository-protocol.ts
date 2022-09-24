import { BillModel, DbInsertBillModel } from "./index";

export interface InsertBillRepository {
  insert(bill: DbInsertBillModel): Promise<BillModel>;
}
