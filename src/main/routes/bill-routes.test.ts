import ShortUniqueId from "short-unique-id";
import request from "supertest";
import { SqliteHelper } from "../../infra/db/postgresql/helpers/sqlite-helper";

import app from "../config/app";

const generateId = new ShortUniqueId({ length: 6 });
const clientId = String(generateId()).toUpperCase();

describe("Bill Routes", () => {
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

  it("Should return an bill on success", async () => {
    await request(app)
      .post("/bill")
      .send({
        clientId,
        name: "valid_name",
        value: "50",
        expireDate: "2023-01-27T03:00:00.000Z",
        daysBeforeExpireDateToRemember: "5",
      })
      .expect(200);
  });

  it("Should return an bill list on success", async () => {
    await request(app).get(`/bill?clientId=${clientId}`).expect(200);
  });
});
