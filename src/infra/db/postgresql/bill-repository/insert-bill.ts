import {
  BillModel,
  DbInsertBillModel,
  InsertBillRepository,
} from "../../../../data/protocols/index";
import { SqliteHelper } from "../helpers/sqlite-helper";
import ShortUniqueId from "short-unique-id";
import { map } from "./bill-mapper";

export class InsertBillSqliteRepository implements InsertBillRepository {
  async insert(bill: DbInsertBillModel): Promise<BillModel> {
    let code = "";

    if (!bill.id) {
      const generateId = new ShortUniqueId({ length: 6 });
      code = String(generateId()).toUpperCase();
    } else {
      code = bill.id;
    }

    await SqliteHelper.createBill({ id: code, ...bill });

    return map(bill, code);
  }
}
