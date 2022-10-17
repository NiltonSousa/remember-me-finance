import {
  BillModel,
  DbInsertBillModel,
  InsertBillRepository,
} from "../../../../data/protocols/index";
import { sequelize } from "../helpers/database";
import { Bill } from "../helpers/sqlite-helper";

export class BillSqliteRepository implements InsertBillRepository {
  async insert(bill: DbInsertBillModel): Promise<BillModel> {
    const resultado = await sequelize.sync();

    const resultadoCreate = await Bill.create({
      name: "valid_name",
      value: "50",
      expireDate: "01/01/1999",
      daysBeforeExpireDateToRemember: "5",
    });
    console.log(resultadoCreate);

    return {
      id: "valid_id",
      name: "valid_name",
      value: "50",
      expireDate: "01/01/1999",
      daysBeforeExpireDateToRemember: "5",
    };
  }
}
