export interface DeleteBill {
  delete(billId: string): Promise<string>;
}
