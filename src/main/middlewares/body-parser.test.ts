import request from "supertest";

import app from "../config/app";

describe("Body parser middleware", () => {
  it("Should return response body when request success", async () => {
    app.post("/test_body_parser", (req, res) => {
      res.send(req.body);
    });

    await request(app)
      .post("/test_body_parser")
      .send({ name: "nil" })
      .expect({ name: "nil" });
  });
});
