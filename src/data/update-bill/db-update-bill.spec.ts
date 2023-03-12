import {
  BillModel,
  UpdateBillRepository,
  DbUpdateBillModel,
} from "../protocols/index";
import { DbUpdateBill } from "./db-update-bill";

const makeUpdateBillRepository = (): UpdateBillRepository => {
  class UpdateBillRepositoryStub implements UpdateBillRepository {
    async update(bill: DbUpdateBillModel): Promise<BillModel> {
      const fakeBill = {
        id: "valid_id",
        clientId: "valid_id",
        name: "valid_name",
        value: "50",
        expireDate: "01/01/1999",
        daysBeforeExpireDateToRemember: "5",
      };
      return new Promise((resolve) => resolve(fakeBill));
    }
  }

  return new UpdateBillRepositoryStub();
};

export interface SutTypes {
  sut: DbUpdateBill;
  updateBillRepositoryStub: UpdateBillRepository;
}
const makeSut = (): SutTypes => {
  const updateBillRepositoryStub = makeUpdateBillRepository();
  const sut = new DbUpdateBill(updateBillRepositoryStub);

  return {
    sut,
    updateBillRepositoryStub,
  };
};

describe("DbUpdateBill usecase", () => {
  it("Should throw if UpdateBillRepository throws", async () => {
    const { sut, updateBillRepositoryStub } = makeSut();

    jest
      .spyOn(updateBillRepositoryStub, "update")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const billData = {
      id: "valid_id",
      clientId: "valid_id",
      name: "valid_name",
      value: "50",
      expireDate: "01/01/1999",
      daysBeforeExpireDateToRemember: "5",
    };

    const promise = sut.update(billData);

    await expect(promise).rejects.toThrow();
  });

  it("Should call UpdateBillRepository with correct values", async () => {
    const { sut, updateBillRepositoryStub } = makeSut();

    const insertSpy = jest.spyOn(updateBillRepositoryStub, "update");

    const billData = {
      id: "valid_id",
      clientId: "valid_id",
      name: "valid_name",
      value: "50",
      expireDate: "01/01/1999",
      daysBeforeExpireDateToRemember: "5",
    };

    await sut.update(billData);

    expect(insertSpy).toHaveBeenCalledWith({
      id: "valid_id",
      clientId: "valid_id",
      name: "valid_name",
      value: "50",
      expireDate: "01/01/1999",
      daysBeforeExpireDateToRemember: "5",
    });
  });

  it("Should return an bill when success", async () => {
    const { sut } = makeSut();

    const billData = {
      id: "valid_id",
      clientId: "valid_id",
      name: "valid_name",
      value: "50",
      expireDate: "01/01/1999",
      daysBeforeExpireDateToRemember: "5",
    };

    const bill = await sut.update(billData);

    expect(bill).toEqual({
      id: "valid_id",
      clientId: "valid_id",
      name: "valid_name",
      value: "50",
      expireDate: "01/01/1999",
      daysBeforeExpireDateToRemember: "5",
    });
  });
});
