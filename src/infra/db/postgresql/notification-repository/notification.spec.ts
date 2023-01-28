import ShortUniqueId from "short-unique-id";
import { SqliteHelper } from "../helpers/sqlite-helper";
import { InsertNotificationSqliteRepository } from "./insert-notification";

describe("Notification sqlite repository", () => {
  const generateId = new ShortUniqueId({ length: 7 });
  const billId = String(generateId()).toUpperCase();
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

    await SqliteHelper.createBill({
      id: billId,
      clientId,
      name: "valid_name",
      value: "valid_value",
      expireDate: "2023-01-27T03:00:00.000Z",
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

  it("Should return a notification when insert is success", async () => {
    const sut = new InsertNotificationSqliteRepository();

    return await sut
      .insert({
        id: "valid_id",
        billId,
        type: "valid_type",
        message: "hello_world",
      })
      .then((data) => {
        expect(data.billId).toEqual(billId);
        expect(data.type).toEqual("valid_type");
        expect(data.message).toEqual("hello_world");
      });
  });
});
