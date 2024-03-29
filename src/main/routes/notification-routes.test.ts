import ShortUniqueId from "short-unique-id";
import request from "supertest";
import { SqliteHelper } from "../../infra/db/postgresql/helpers/sqlite-helper";

import app from "../config/app";

const generateId = new ShortUniqueId({ length: 6 });
const clientId = String(generateId()).toUpperCase();
const billId = String(generateId()).toUpperCase();

describe("Notification Routes", () => {
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
      value: "valid_value",
      name: "valid_name",
      expireDate: "2023-01-27T03:00:00.000Z",
      daysBeforeExpireDateToRemember: "5",
    });
  });

  afterAll(async () => {
    const deleteOlderClients = SqliteHelper.client.client.deleteMany();

    await SqliteHelper.client.$transaction([deleteOlderClients]);
    await SqliteHelper.disconnect();
  });

  it("Should return an notification on success", async () => {
    await request(app)
      .post("/notification")
      .send({
        billId,
        type: "valid_type",
        message: "hello_world",
      })
      .expect(200);
  });
});
