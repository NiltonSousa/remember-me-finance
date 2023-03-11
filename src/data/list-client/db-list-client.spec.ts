import { ClientModel } from "../../domain/models";
import { ListClientRepository } from "../protocols/index";
import { DbListClient } from "./db-list-client";

const makeListClientRepository = (): ListClientRepository => {
  class ListClientRepositoryStub implements ListClientRepository {
    async list(clientId: string): Promise<ClientModel> {
      const fakeClient: ClientModel = {
        id: "valid_id",
        cpf: "valid_cpf",
        name: "valid_name",
        birthdate: "valid_birthdate",
        phoneNumber: "valid_phoneNumber",
        email: "valid_email@mail.com",
        billsCount: "0",
      };
      return new Promise((resolve) => resolve(fakeClient));
    }
  }

  return new ListClientRepositoryStub();
};

export interface SutTypes {
  sut: DbListClient;
  listClientRepositoryStub: ListClientRepository;
}
const makeSut = (): SutTypes => {
  const listClientRepositoryStub = makeListClientRepository();
  const sut = new DbListClient(listClientRepositoryStub);

  return {
    sut,
    listClientRepositoryStub,
  };
};

describe("DbListClient usecase", () => {
  it("Should throw if ListClientRepository throws", async () => {
    const { sut, listClientRepositoryStub } = makeSut();

    jest
      .spyOn(listClientRepositoryStub, "list")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.list("valid_id");

    await expect(promise).rejects.toThrow();
  });

  it("Should call ListClientRepository with correct values", async () => {
    const { sut, listClientRepositoryStub } = makeSut();

    const listSpy = jest.spyOn(listClientRepositoryStub, "list");

    await sut.list("valid_id");

    expect(listSpy).toHaveBeenCalledWith("valid_id");
  });

  it("Should return an client list when success", async () => {
    const { sut } = makeSut();

    const client = await sut.list("valid_id");

    expect(client).toEqual({
      id: "valid_id",
      cpf: "valid_cpf",
      name: "valid_name",
      birthdate: "valid_birthdate",
      phoneNumber: "valid_phoneNumber",
      email: "valid_email@mail.com",
      billsCount: "0",
    });
  });
});
