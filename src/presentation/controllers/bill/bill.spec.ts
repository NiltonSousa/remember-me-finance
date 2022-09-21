import { InsertBillController } from "./insert-bill";

describe("Insert bill controller", () => {
  it("Should return 400 if no name is provided", () => {
    const controller = new InsertBillController();

    const httpRequest = {
      body: {
        value: "valid_value",
        expireDate: "11/01/1999",
        daysBeforeRemember: 5,
      },
    };

    const httpResponse = controller.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual("params name is not provided");
  });
});
