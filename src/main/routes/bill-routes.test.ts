import request from "supertest";

import app from "../config/app";

describe("Bill Routes", () => {
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
