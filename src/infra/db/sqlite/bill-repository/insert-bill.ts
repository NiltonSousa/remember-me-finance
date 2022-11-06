import {
  BillModel,
  DbInsertBillModel,
  InsertBillRepository,
} from "../../../../data/protocols/index";
import { SqliteHelper } from "../helpers/sqlite-helper";
import ShortUniqueId from "short-unique-id";
import { map } from "./bill-mapper";

export class BillSqliteRepository implements InsertBillRepository {
  async insert(bill: DbInsertBillModel): Promise<BillModel> {
    await SqliteHelper.createBill(bill);
    const generateId = new ShortUniqueId({ length: 6 });
    const code = String(generateId()).toUpperCase();

    return map(bill, code);
  }
}
