import { UpdateBillModel, UpdateBillRepository } from "../protocols/index";

export class DbUpdateBill implements UpdateBillModel {
  private readonly updateBillRepository: UpdateBillRepository;

  constructor(updateBillRepository: UpdateBillRepository) {
    this.updateBillRepository = updateBillRepository;
  }

  async update(billId: string): Promise<string> {
    return await this.updateBillRepository.update(billId);
  }
}
