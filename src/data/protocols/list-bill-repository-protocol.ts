import { BillModel } from "./index";

export interface ListBillRepository {
  list(clientId: string): Promise<Array<BillModel>>;
}
