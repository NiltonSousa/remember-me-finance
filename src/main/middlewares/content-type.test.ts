import request from "supertest";

import app from "../config/app";

describe("Content-type middleware", () => {
  it("Should return default content-type is json", async () => {
    app.get("/test_content_type", (req, res) => {
      res.send();
    });

    await request(app).get("/test_content_type").expect("content-type", /json/);
  });
});
