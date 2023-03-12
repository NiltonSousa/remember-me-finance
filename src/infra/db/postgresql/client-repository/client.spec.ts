import ShortUniqueId from "short-unique-id";
import { SqliteHelper } from "../helpers/sqlite-helper";
import { InsertClientSqliteRepository } from "./insert-client";
import { ListClientSqliteRepository } from "./list-client";

describe("Client sqlite repository", () => {
  const generateId = new ShortUniqueId({ length: 6 });
  const clientId = String(generateId()).toUpperCase();

  beforeAll(async () => {
    SqliteHelper.connect("test");
    await SqliteHelper.createClient(
      clientId,
      "valid_name",
      "12345678",
      "19/01/1999",
      "user@mail.com",
      "123",
      "4"
    );
  });

  afterAll(async () => {
    const deleteOlderClients = SqliteHelper.client.client.deleteMany();

    await SqliteHelper.client.$transaction([deleteOlderClients]);

    await SqliteHelper.disconnect();
  });

  const makeSutList = () => {
    return new ListClientSqliteRepository();
  };

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

  it("Should return a client when list is success", async () => {
    const sut = makeSutList();

    return await sut.list(clientId).then((data) => {
      expect(data[0].id).toEqual(clientId);
      expect(data[0].name).toEqual("valid_name");
      expect(data[0].cpf).toEqual("12345678");
      expect(data[0].birthdate).toEqual("19/01/1999");
      expect(data[0].email).toEqual("user@mail.com");
      expect(data[0].phoneNumber).toEqual("123");
      expect(data[0].billsCount).toEqual("4");
    });
  });
});
