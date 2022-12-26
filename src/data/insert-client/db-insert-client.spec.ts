import { ClientModel } from "../../domain/models";
import { DbInsertClientModel, InsertClientRepository } from "../protocols";
import { DbInsertClient } from "./db-insert-client";

const makeInsertClientRepositoryStub = (): InsertClientRepository => {
  class InsertClientRepositoryStub implements InsertClientRepository {
    async insert(client: DbInsertClientModel): Promise<ClientModel> {
      const fakeClient = {
        id: "valid_id",
        name: "valid_name",
        cpf: "valid_cpf",
        birthdate: "19/01/1999",
        email: "valid@mail.com",
        phoneNumber: "valid_number",
        billsCount: "0",
      };

      return new Promise((resolve) => resolve(fakeClient));
    }
  }

  return new InsertClientRepositoryStub();
};

const makeSut = () => {
  const insertClientRepositoryStub = makeInsertClientRepositoryStub();
  const sut = new DbInsertClient(insertClientRepositoryStub);

  return { sut, insertClientRepositoryStub };
};
describe("DbInsertClient use case", () => {
  it("Should throw if InsertClientRepository throws", async () => {
    const { sut, insertClientRepositoryStub } = makeSut();

    jest
      .spyOn(insertClientRepositoryStub, "insert")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const clientData = {
      name: "valid_name",
      cpf: "valid_cpf",
      birthdate: "19/01/1999",
      email: "valid@mail.com",
      phoneNumber: "valid_number",
      billsCount: "0",
    };

    const promise = sut.insert(clientData);

    await expect(promise).rejects.toThrow();
  });

  it("Should call insertClientRepository with correct values", async () => {
    const { sut, insertClientRepositoryStub } = makeSut();

    const clientData = {
      name: "valid_name",
      cpf: "valid_cpf",
      birthdate: "19/01/1999",
      email: "valid@mail.com",
      phoneNumber: "valid_number",
      billsCount: "0",
    };

    const insertSpy = jest.spyOn(insertClientRepositoryStub, "insert");

    await sut.insert(clientData);

    expect(insertSpy).toHaveBeenCalledWith({
      name: "valid_name",
      cpf: "valid_cpf",
      birthdate: "19/01/1999",
      email: "valid@mail.com",
      phoneNumber: "valid_number",
      billsCount: "0",
    });
  });
});
