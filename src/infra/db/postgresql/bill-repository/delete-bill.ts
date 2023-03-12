import { DeleteBillRepository } from "../../../../data/protocols/index";
import { SqliteHelper } from "../helpers/sqlite-helper";

export class DeleteBillSqliteRepository implements DeleteBillRepository {
  async delete(billId: string): Promise<string> {
    await SqliteHelper.deleteBill(billId);

    return "Bill deleted with sucess!";
  }
}
