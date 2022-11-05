import {
  ListBillRepository,
  BillModel,
  ListBillModel,
} from "../protocols/index";

export class DbListBill implements ListBillModel {
  private readonly listBillRepository: ListBillRepository;

  constructor(listBillRepository: ListBillRepository) {
    this.listBillRepository = listBillRepository;
  }

  async list(clientId: string): Promise<Array<BillModel>> {
    return await this.listBillRepository.list(clientId);
  }
}
