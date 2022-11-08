import { InsertBillSqliteRepository } from "./insert-bill";
import { ListBillSqliteRepository } from "./list-bill";
import { SqliteHelper } from "../helpers/sqlite-helper";
import ShortUniqueId from "short-unique-id";

const generateId = new ShortUniqueId({ length: 6 });
const clientId = String(generateId()).toUpperCase();

const makeSutInsert = () => {
  return new InsertBillSqliteRepository();
};

const makeSutList = () => {
  return new ListBillSqliteRepository();
};

describe("Bill sqlite repository", () => {
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

  it("Should return a bill when insert is success", async () => {
    const sut = makeSutInsert();

    return await sut
      .insert({
        id: "valid_id",
        clientId,
        name: "valid_name",
        value: "50",
        expireDate: "01/01/1999",
        daysBeforeExpireDateToRemember: "5",
      })
      .then((data) => {
        expect(data.clientId).toEqual(clientId);
        expect(data.name).toEqual("valid_name");
        expect(data.value).toEqual("50");
        expect(data.expireDate).toEqual("01/01/1999");
        expect(data.daysBeforeExpireDateToRemember).toEqual("5");
      });
  });

  it("Should return a bill when list is success", async () => {
    const sut = makeSutList();

    return await sut.list(clientId).then((data) => {
      expect(data[0].clientId).toEqual(clientId);
      expect(data[0].name).toEqual("valid_name");
      expect(data[0].value).toEqual("50");
      expect(data[0].expireDate).toEqual("01/01/1999");
      expect(data[0].daysBeforeExpireDateToRemember).toEqual("5");
    });
  });
});
