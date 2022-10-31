import request from "supertest";
import { SqliteHelper } from "../../infra/db/sqlite/helpers/sqlite-helper";

import app from "../config/app";

describe("Bill Routes", () => {
  beforeAll(async () => {
    SqliteHelper.connect();
    SqliteHelper.generateTableBills();
    await SqliteHelper.bill.sync();
  });

  it("Should return an bill on success", async () => {
    await request(app)
      .post("/bill")
      .send({
        name: "valid_name",
        value: "50",
        expireDate: "01/01/1999",
        daysBeforeExpireDateToRemember: "5",
      })
      .expect(200);
  });
});
