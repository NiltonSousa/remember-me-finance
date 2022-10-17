import { BillSqliteRepository } from "./bill";

describe("Bill sqlite repository", () => {
  it("Should return a bill on success", async () => {
    const sut = new BillSqliteRepository();

    // const bill = await sut.insert({
    //   name: "valid_name",
    //   value: "50",
    //   expireDate: "01/01/1999",
    //   daysBeforeExpireDateToRemember: "5",
    // });

    // expect(bill).toEqual({
    //   id: "valid_id",
    //   name: "valid_name",
    //   value: "50",
    //   expireDate: "01/01/1999",
    //   daysBeforeExpireDateToRemember: "5",
    // });

    return await sut
      .insert({
        name: "valid_name",
        value: "50",
        expireDate: "01/01/1999",
        daysBeforeExpireDateToRemember: "5",
      })
      .then((data) => {
        console.log("alou", data);
        expect(data).toEqual({
          id: "valid_id",
          name: "valid_name",
          value: "50",
          expireDate: "01/01/1999",
          daysBeforeExpireDateToRemember: "5",
        });
      });
  });
});
