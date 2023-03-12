import {
  BillModel,
  DbUpdateBillModel,
  UpdateBillRepository,
} from "../../../../data/protocols/index";
import { SqliteHelper } from "../helpers/sqlite-helper";

export class UpdateBillSqliteRepository implements UpdateBillRepository {
  async update(bill: DbUpdateBillModel): Promise<BillModel> {
    await SqliteHelper.updateBill(bill);

    return bill;
  }
}
