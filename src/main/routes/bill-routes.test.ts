import ShortUniqueId from "short-unique-id";
import request from "supertest";
import { SqliteHelper } from "../../infra/db/sqlite/helpers/sqlite-helper";

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

  it("Should return an bill on success", async () => {
    await request(app)
      .post("/bill")
      .send({
        clientId,
        name: "valid_name",
        value: "50",
        expireDate: "01/01/1999",
        daysBeforeExpireDateToRemember: "5",
      })
      .expect(200);
  });
});
