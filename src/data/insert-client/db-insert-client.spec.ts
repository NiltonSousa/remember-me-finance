import { DbInsertClient } from "./db-insert-client";

const makeSut = () => {
  const sut = new DbInsertClient();

  return { sut };
};
describe("DbInsertClient use case", () => {
  it("Should throw if InsertClientRepository throws", async () => {
    const { sut } = makeSut();

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
});
