import { InsertBillSqliteRepository } from "./insert-bill";
import { ListBillSqliteRepository } from "./list-bill";
import { SqliteHelper } from "../helpers/sqlite-helper";
import ShortUniqueId from "short-unique-id";
import { DeleteBillSqliteRepository } from "./delete-bill";
import { UpdateBillSqliteRepository } from "./update-bill";

const generateId = new ShortUniqueId({ length: 6 });
const clientId = String(generateId()).toUpperCase();

const makeSutInsert = () => {
  return new InsertBillSqliteRepository();
};

const makeSutUpdate = () => {
  return new UpdateBillSqliteRepository();
};

const makeSutList = () => {
  return new ListBillSqliteRepository();
};

const makeSutDelete = () => {
  return new DeleteBillSqliteRepository();
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

    await SqliteHelper.createBill({
      clientId,
      id: "valid_bill_id",
      name: "valid_name",
      value: "10",
      expireDate: "2023-01-28T00:00:00.000Z",
      daysBeforeExpireDateToRemember: "5",
    });
  });

  afterAll(async () => {
    const deleteOlderClients = SqliteHelper.client.client.deleteMany();
    const deleteOlderBills = SqliteHelper.client.bill.deleteMany();

    await SqliteHelper.client.$transaction([
      deleteOlderClients,
      deleteOlderBills,
    ]);
    await SqliteHelper.disconnect();
  });

  it("Should return a bill when insert is success", async () => {
    const sut = makeSutInsert();

    return await sut
      .insert({
        id: "valid_id",
        clientId,
        name: "valid_name",
        value: "50",
        expireDate: "2023-01-27T03:00:00.000Z",
        daysBeforeExpireDateToRemember: "5",
      })
      .then((data) => {
        expect(data.clientId).toEqual(clientId);
        expect(data.name).toEqual("valid_name");
        expect(data.value).toEqual("50");
        expect(data.expireDate).toEqual("2023-01-27T03:00:00.000Z");
        expect(data.daysBeforeExpireDateToRemember).toEqual("5");
      });
  });

  it("Should return a bill when update is success", async () => {
    const sut = makeSutUpdate();

    return await sut
      .update({
        id: "valid_id",
        clientId,
        name: "valid_name",
        value: "50",
        expireDate: "2023-01-27T03:00:00.000Z",
        daysBeforeExpireDateToRemember: "5",
      })
      .then((data) => {
        expect(data.clientId).toEqual(clientId);
        expect(data.name).toEqual("valid_name");
        expect(data.value).toEqual("50");
        expect(data.expireDate).toEqual("2023-01-27T03:00:00.000Z");
        expect(data.daysBeforeExpireDateToRemember).toEqual("5");
      });
  });

  it("Should return a bill when list is success", async () => {
    const sut = makeSutList();

    return await sut.list(clientId).then((data) => {
      expect(data[0].clientId).toEqual(clientId);
      expect(data[0].name).toEqual("valid_name");
      expect(data[0].value).toEqual("10");
      expect(data[0].daysBeforeExpireDateToRemember).toEqual("5");
    });
  });

  it("Should return a success message when delete is success", async () => {
    const sut = makeSutDelete();

    return await sut.delete("valid_bill_id").then((message) => {
      expect(message).toEqual("Bill deleted with sucess!");
    });
  });
});
