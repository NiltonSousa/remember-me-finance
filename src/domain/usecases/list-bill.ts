import { BillModel } from "../models/index";

export interface ListBill {
  insert(clientId: string): Promise<Array<BillModel>>;
}
