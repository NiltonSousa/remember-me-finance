import { BillModel } from "../models";
export interface UpdateBill {
  update(billId: BillModel): Promise<BillModel>;
}
