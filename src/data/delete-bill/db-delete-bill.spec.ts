import { DeleteBillRepository } from "../protocols/index";
import { DbDeleteBill } from "./db-delete-bill";

const makeDeleteBillRepository = (): DeleteBillRepository => {
  class DeleteBillRepositoryStub implements DeleteBillRepository {
    async delete(billId: string): Promise<string> {
      const fakeResponse = "Bill deleted with success!";
      return new Promise((resolve) => resolve(fakeResponse));
    }
  }

  return new DeleteBillRepositoryStub();
};

export interface SutTypes {
  sut: DbDeleteBill;
  deleteBillRepositoryStub: DeleteBillRepository;
}

const makeSut = (): SutTypes => {
  const deleteBillRepositoryStub = makeDeleteBillRepository();
  const sut = new DbDeleteBill(deleteBillRepositoryStub);

  return {
    sut,
    deleteBillRepositoryStub,
  };
};

describe("DbDeleteBill usecase", () => {
  it("Should throw if DekleteBillRepository throws", async () => {
    const { sut, deleteBillRepositoryStub } = makeSut();

    jest
      .spyOn(deleteBillRepositoryStub, "delete")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.delete("valid_bill_id");

    await expect(promise).rejects.toThrow();
  });

  it("Should call DeleteBillRepository with correct values", async () => {
    const { sut, deleteBillRepositoryStub } = makeSut();

    const deleteSpy = jest.spyOn(deleteBillRepositoryStub, "delete");

    await sut.delete("valid_bill_id");

    expect(deleteSpy).toHaveBeenCalledWith("valid_bill_id");
  });

  it("Should return success message when delete is a success", async () => {
    const { sut } = makeSut();

    const message = await sut.delete("valid_bill_id");

    expect(message).toEqual("Bill deleted with success!");
  });
});
