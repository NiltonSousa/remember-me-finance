import { BillModel } from "../models/index";

export interface ListBill {
  list(clientId: string): Promise<Array<BillModel>>;
}
