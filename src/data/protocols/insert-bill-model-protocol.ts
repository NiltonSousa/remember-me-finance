export interface BillModel {
  id: string;
  name: string;
  value: string;
  expireDate: string;
  daysBeforeExpireDateToRemember: string;
}
export interface DbInsertBillModel {
  name: string;
  value: string;
  expireDate: string;
  daysBeforeExpireDateToRemember: string;
}

export interface InsertBillModel {
  insert(bill: DbInsertBillModel): Promise<BillModel>;
}
