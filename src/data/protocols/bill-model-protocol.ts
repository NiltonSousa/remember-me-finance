export interface BillModel {
  id: string;
  clientId?: string;
  name: string;
  value: string;
  expireDate: string;
  daysBeforeExpireDateToRemember: string;
}
export interface DbInsertBillModel {
  id?: string;
  clientId: string;
  name: string;
  value: string;
  expireDate: string;
  daysBeforeExpireDateToRemember: string;
}

export interface InsertBillModel {
  insert(bill: DbInsertBillModel): Promise<BillModel>;
}

export interface ListBillModel {
  list(clientId: string): Promise<Array<BillModel>>;
}

export interface DeleteBillModel {
  delete(billId: string): Promise<string>;
}

export interface UpdateBillModel {
  update(billId: string): Promise<string>;
}
