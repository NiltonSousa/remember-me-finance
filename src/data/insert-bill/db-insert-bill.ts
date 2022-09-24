import {
  InsertBillRepository,
  BillModel,
  InsertBillModel,
  DbInsertBillModel,
} from "../protocols/index";

export class DbInsertBill implements InsertBillModel {
  private readonly insertBillRepository: InsertBillRepository;

  constructor(inserBillRepository: InsertBillRepository) {
    this.insertBillRepository = inserBillRepository;
  }

  async insert(billData: DbInsertBillModel): Promise<BillModel> {
    return await this.insertBillRepository.insert(billData);
  }
}
