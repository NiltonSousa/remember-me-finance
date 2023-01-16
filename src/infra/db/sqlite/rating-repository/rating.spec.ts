import { SqliteHelper } from "../helpers/sqlite-helper";
import ShortUniqueId from "short-unique-id";
import { InsertRatingSqliteRepository } from "./insert-rating";

const generateId = new ShortUniqueId({ length: 6 });
const clientId = String(generateId()).toUpperCase();

const makeSutInsert = () => {
  return new InsertRatingSqliteRepository();
};

describe("Rating sqlite repository", () => {
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

  it("Should return a rating when insert is success", async () => {
    const sut = makeSutInsert();

    return await sut
      .insert({
        id: "valid_id",
        clientId,
        grade: "5",
        insertedAt: "01/01/1999",
      })
      .then((data) => {
        expect(data.clientId).toEqual(clientId);
        expect(data.grade).toEqual("5");
        expect(data.insertedAt).toEqual("01/01/1999");
      });
  });
});
