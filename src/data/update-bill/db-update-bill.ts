import {
  BillModel,
  DbUpdateBillModel,
  UpdateBillModel,
  UpdateBillRepository,
} from "../protocols/index";

export class DbUpdateBill implements UpdateBillModel {
  private readonly updateBillRepository: UpdateBillRepository;

  constructor(updateBillRepository: UpdateBillRepository) {
    this.updateBillRepository = updateBillRepository;
  }

  async update(billData: DbUpdateBillModel): Promise<BillModel> {
    return await this.updateBillRepository.update(billData);
  }
}
