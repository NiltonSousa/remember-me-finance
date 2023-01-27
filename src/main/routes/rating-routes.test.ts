import ShortUniqueId from "short-unique-id";
import request from "supertest";
import { SqliteHelper } from "../../infra/db/postgresql/helpers/sqlite-helper";

import app from "../config/app";

const generateId = new ShortUniqueId({ length: 6 });
const clientId = String(generateId()).toUpperCase();

describe("Rating Routes", () => {
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
      const deleteOlderRatings = SqliteHelper.client.rating.deleteMany();

  
      await SqliteHelper.client.$transaction([deleteOlderClients, deleteOlderRatings]);
      await SqliteHelper.disconnect();
    });
  
    it("Should return an rating on success", async () => {
      await request(app)
        .post("/rating")
        .send({
          clientId,
          grade: "5",
          insertedAt: "19/01/1999",
        })
        .expect(200);
    });
  });
  