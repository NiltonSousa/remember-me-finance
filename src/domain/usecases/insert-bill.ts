import { BillModel } from "../models/index";

export interface InsertBillModel {
  clientId: string;
  name: string;
  value: string;
  expireDate: string;
  daysBeforeExpireDateToRemember: string;
}

export interface InsertBill {
  insert(bill: InsertBillModel): Promise<BillModel>;
}
