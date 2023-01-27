import request from "supertest";
import { SqliteHelper } from "../../infra/db/postgresql/helpers/sqlite-helper";

import app from "../config/app";

describe("Client Routes", () => {
  beforeAll(async () => {
    SqliteHelper.connect("test");
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
});
