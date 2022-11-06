import { InsertBillSqliteRepository } from "./insert-bill";
import { ListBillSqliteRepository } from "./list-bill";
import { SqliteHelper } from "../helpers/sqlite-helper";

const makeSutInsert = () => {
  return new InsertBillSqliteRepository();
};

const makeSutList = () => {
  return new ListBillSqliteRepository();
};

describe("Bill sqlite repository", () => {
  beforeAll(async () => {
    SqliteHelper.connect("test");
  });

  it("Should return a bill when insert is success", async () => {
    const sut = makeSutInsert();

    return await sut
      .insert({
        id: "valid_id",
        clientId: "b307e9cc-a95d-4a11-bdbd-ee8f3d0d3140",
        name: "valid_name",
        value: "50",
        expireDate: "01/01/1999",
        daysBeforeExpireDateToRemember: "5",
      })
      .then((data) => {
        console.log("alooo", data);

        expect(data.clientId).toEqual("b307e9cc-a95d-4a11-bdbd-ee8f3d0d3140");
        expect(data.name).toEqual("valid_name");
        expect(data.value).toEqual("50");
        expect(data.expireDate).toEqual("01/01/1999");
        expect(data.daysBeforeExpireDateToRemember).toEqual("5");
      });
  });

  it("Should return a bill when list is success", async () => {
    const sut = makeSutList();

    return await sut
      .list("b307e9cc-a95d-4a11-bdbd-ee8f3d0d3140")
      .then((data) => {
        console.log("data ->", data);

        expect(data[0].clientId).toEqual(
          "b307e9cc-a95d-4a11-bdbd-ee8f3d0d3140"
        );
        expect(data[0].name).toEqual("valid_name");
        expect(data[0].value).toEqual("50");
        expect(data[0].expireDate).toEqual("01/01/1999");
        expect(data[0].daysBeforeExpireDateToRemember).toEqual("5");
      });
  });
});
