import { BillSqliteRepository } from "./bill";

describe("Bill sqlite repository", () => {
  it("Should return a bill on success", async () => {
    const sut = new BillSqliteRepository();

    return await sut
      .insert({
        name: "valid_name",
        value: "50",
        expireDate: "01/01/1999",
        daysBeforeExpireDateToRemember: "5",
      })
      .then((data) => {
        expect(data.name).toEqual("valid_name");
        expect(data.value).toEqual("50");
        expect(data.expireDate).toEqual("01/01/1999");
        expect(data.daysBeforeExpireDateToRemember).toEqual("5");
      });
  });
});
