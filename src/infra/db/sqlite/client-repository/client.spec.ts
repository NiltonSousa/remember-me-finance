import ShortUniqueId from "short-unique-id";
import { SqliteHelper } from "../helpers/sqlite-helper";
import { InsertClientSqliteRepository } from "./insert-client";

describe("Client sqlite repository", () => {
  beforeAll(async () => {
    SqliteHelper.connect("test");
  });

  afterAll(async () => {
    const deleteOlderClients = SqliteHelper.client.client.deleteMany();

    await SqliteHelper.client.$transaction([deleteOlderClients]);

    await SqliteHelper.disconnect();
  });

  it("Should return an client when insert is success", async () => {
    const sut = new InsertClientSqliteRepository();

    return await sut
      .insert({
        name: "valid_name",
        cpf: "valid_cpf",
        birthdate: "19/01/1999",
        email: "valid@mail.com",
        phoneNumber: "valid_number",
        billsCount: "0",
      })
      .then((data) => {
        expect(data.name).toEqual("valid_name");
        expect(data.cpf).toEqual("valid_cpf");
        expect(data.birthdate).toEqual("19/01/1999");
        expect(data.email).toEqual("valid@mail.com");
        expect(data.phoneNumber).toEqual("valid_number");
        expect(data.billsCount).toEqual("0");
      });
  });
});
