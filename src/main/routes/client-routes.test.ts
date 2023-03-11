import request from "supertest";
import { SqliteHelper } from "../../infra/db/postgresql/helpers/sqlite-helper";

import app from "../config/app";
import ShortUniqueId from "short-unique-id";

describe("Client Routes", () => {
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

  it("Should return an client on success", async () => {
    await request(app)
      .post("/client")
      .send({
        name: "valid_name",
        cpf: "valid_cpf",
        birthdate: "19/01/1999",
        email: "valid@mail.com",
        phoneNumber: "valid_number",
        billsCount: "0",
      })
      .expect(200);
  });

  it("Should return an client list on success", async () => {
    await request(app).get(`/client?clientId=${clientId}`).expect(200);
  });
});
