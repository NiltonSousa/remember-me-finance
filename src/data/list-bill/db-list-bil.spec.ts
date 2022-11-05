import { ListBillRepository, BillModel } from "../protocols/index";
import { DbListBill } from "./db-list-bill";

const makeListBillRepository = (): ListBillRepository => {
  class ListBillRepositoryStub implements ListBillRepository {
    async list(clientId: string): Promise<Array<BillModel>> {
      const fakeBill = [
        {
          id: "valid_id",
          clientId: "valid_id",
          name: "valid_name",
          value: "50",
          expireDate: "01/01/1999",
          daysBeforeExpireDateToRemember: "5",
        },
      ];
      return new Promise((resolve) => resolve(fakeBill));
    }
  }

  return new ListBillRepositoryStub();
};

export interface SutTypes {
  sut: DbListBill;
  listBillRepositoryStub: ListBillRepository;
}
const makeSut = (): SutTypes => {
  const listBillRepositoryStub = makeListBillRepository();
  const sut = new DbListBill(listBillRepositoryStub);

  return {
    sut,
    listBillRepositoryStub,
  };
};

describe("DbListBill usecase", () => {
  it("Should throw if ListBillRepository throws", async () => {
    const { sut, listBillRepositoryStub } = makeSut();

    jest
      .spyOn(listBillRepositoryStub, "list")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.list("valid_id");

    await expect(promise).rejects.toThrow();
  });

  it("Should call ListBillRepository with correct values", async () => {
    const { sut, listBillRepositoryStub } = makeSut();

    const listSpy = jest.spyOn(listBillRepositoryStub, "list");

    await sut.list("valid_id");

    expect(listSpy).toHaveBeenCalledWith("valid_id");
  });

  it("Should return an bill list when success", async () => {
    const { sut } = makeSut();

    const bills = await sut.list("valid_id");

    expect(bills).toEqual([
      {
        id: "valid_id",
        clientId: "valid_id",
        name: "valid_name",
        value: "50",
        expireDate: "01/01/1999",
        daysBeforeExpireDateToRemember: "5",
      },
    ]);
  });
});
