import {
  BillModel,
  ListBillRepository,
} from "../../../../data/protocols/index";
import { SqliteHelper } from "../helpers/sqlite-helper";

export class ListBillSqliteRepository implements ListBillRepository {
  async list(clientId: string): Promise<Array<BillModel>> {
    return await SqliteHelper.listBills(clientId);
  }
}
