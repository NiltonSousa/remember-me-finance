export interface DeleteBillRepository {
  delete(billId: string): Promise<string>;
}
