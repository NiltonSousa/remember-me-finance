import { UpdateBillRepository } from "../protocols";
import { DbUpdateBill } from "./db-update-bill";

const makeUpdateBillRepository = (): UpdateBillRepository => {
  class UpdateBillRepositoryStub implements UpdateBillRepository {
    async update(billId: string): Promise<string> {
      const fakeResponse = "Bill updated with success!";
      return new Promise((resolve) => resolve(fakeResponse));
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

    const promise = sut.update("valid_bill_id");

    await expect(promise).rejects.toThrow();
  });

  it("Should call UpdateBillRepository with correct values", async () => {
    const { sut, updateBillRepositoryStub } = makeSut();

    const updateSpy = jest.spyOn(updateBillRepositoryStub, "update");

    await sut.update("valid_bill_id");

    expect(updateSpy).toHaveBeenCalledWith("valid_bill_id");
  });

  it("Should return success message when update is a success", async () => {
    const { sut } = makeSut();

    const message = await sut.update("valid_bill_id");

    expect(message).toEqual("Bill updated with success!");
  });
});
