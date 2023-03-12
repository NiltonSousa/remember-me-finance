export interface UpdateBill {
  update(billId: string): Promise<string>;
}
