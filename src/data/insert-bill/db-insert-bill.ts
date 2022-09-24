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

  insert(bill: DbInsertBillModel): Promise<BillModel> {
    return new Promise((resolve, reject) => reject(new Error()));
  }
}
