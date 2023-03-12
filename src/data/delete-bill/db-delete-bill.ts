import { DeleteBillModel, DeleteBillRepository } from "../protocols/index";

export class DbDeleteBill implements DeleteBillModel {
  private readonly deleteBillRepository: DeleteBillRepository;

  constructor(deleteBillRepository: DeleteBillRepository) {
    this.deleteBillRepository = deleteBillRepository;
  }

  async delete(billId: string): Promise<string> {
    return await this.deleteBillRepository.delete(billId);
  }
}
