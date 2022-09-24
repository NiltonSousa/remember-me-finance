import {
  InsertBillRepository,
  BillModel,
  DbInsertBillModel,
} from "../protocols/index";
import { DbInsertBill } from "./db-insert-bill";

const makeInsertBillRepository = (): InsertBillRepository => {
  class InsertBillRepositoryStub implements InsertBillRepository {
    async insert(bill: DbInsertBillModel): Promise<BillModel> {
      const fakeBill = {
        id: "valid_id",
        name: "valid_name",
        value: "50",
        expireDate: "01/01/1999",
        daysBeforeExpireDateToRemember: "5",
      };
      return new Promise((resolve) => resolve(fakeBill));
    }
  }

  return new InsertBillRepositoryStub();
};

export interface SutTypes {
  sut: DbInsertBill;
  insertBillRepositoryStub: InsertBillRepository;
}
const makeSut = (): SutTypes => {
  const insertBillRepositoryStub = makeInsertBillRepository();
  const sut = new DbInsertBill(insertBillRepositoryStub);

  return {
    sut,
    insertBillRepositoryStub,
  };
};

describe("DbInsertBill usecase", () => {
  it("Should throw if InsertBillRepository throws", async () => {
    const { sut, insertBillRepositoryStub } = makeSut();

    jest
      .spyOn(insertBillRepositoryStub, "insert")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const billData = {
      name: "valid_name",
      value: "50",
      expireDate: "01/01/1999",
      daysBeforeExpireDateToRemember: "5",
    };

    const promise = sut.insert(billData);

    await expect(promise).rejects.toThrow();
  });

  it("Should call InsertBillRepository with correct values", async () => {
    const { sut, insertBillRepositoryStub } = makeSut();

    const insertSpy = jest.spyOn(insertBillRepositoryStub, "insert");

    const billData = {
      name: "valid_name",
      value: "50",
      expireDate: "01/01/1999",
      daysBeforeExpireDateToRemember: "5",
    };

    await sut.insert(billData);

    expect(insertSpy).toHaveBeenCalledWith({
      name: "valid_name",
      value: "50",
      expireDate: "01/01/1999",
      daysBeforeExpireDateToRemember: "5",
    });
  });
});
