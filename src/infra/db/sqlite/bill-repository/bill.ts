import {
  BillModel,
  DbInsertBillModel,
  InsertBillRepository,
} from "../../../../data/protocols/index";
import { Bill } from "../helpers/sqlite-helper";
import { map } from "./bill-mapper";

export class BillSqliteRepository implements InsertBillRepository {
  async insert(bill: DbInsertBillModel): Promise<BillModel> {
    const result = (await Bill.create({
      name: bill.name,
      value: bill.value,
      expireDate: bill.expireDate,
      daysBeforeExpireDateToRemember: bill.daysBeforeExpireDateToRemember,
    })) as any;

    return map(bill, result);
  }
}
