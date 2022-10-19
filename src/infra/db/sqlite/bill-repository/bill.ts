import {
  BillModel,
  DbInsertBillModel,
  InsertBillRepository,
} from "../../../../data/protocols/index";
import { SqliteHelper } from "../helpers/sqlite-helper";
import { map } from "./bill-mapper";

export class BillSqliteRepository implements InsertBillRepository {
  async insert(bill: DbInsertBillModel): Promise<BillModel> {
    try {
      const result = (await SqliteHelper.bill.create({
        name: bill.name,
        value: bill.value,
        expireDate: bill.expireDate,
        daysBeforeExpireDateToRemember: bill.daysBeforeExpireDateToRemember,
      })) as any;

      return map(bill, result);
    } catch (e) {
      console.log("e", e);
    }
  }
}
