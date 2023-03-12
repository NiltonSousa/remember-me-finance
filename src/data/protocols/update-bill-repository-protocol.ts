export interface UpdateBillRepository {
  update(billId: string): Promise<string>;
}
