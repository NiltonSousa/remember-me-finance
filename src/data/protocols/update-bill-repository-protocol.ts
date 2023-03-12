import { BillModel, DbUpdateBillModel } from "./bill-model-protocol";

export interface UpdateBillRepository {
  update(billId: DbUpdateBillModel): Promise<BillModel>;
}
