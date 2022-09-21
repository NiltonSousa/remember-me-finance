import { MissingParamError } from "../../errors/missing-param-error";
import { InsertBillController } from "./insert-bill";

describe("Insert bill controller", () => {
  it("Should return 400 if no name is provided", async () => {
    const controller = new InsertBillController();

    const httpRequest = {
      body: {
        value: "valid_value",
        expireDate: "11/01/1999",
        daysBeforeRemember: 5,
      },
    };

    const httpResponse = await controller.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  it("Should return 400 if no value is provided", async () => {
    const controller = new InsertBillController();

    const httpRequest = {
      body: {
        name: "valid_name",
        expireDate: "11/01/1999",
        daysBeforeRemember: 5,
      },
    };

    const httpResponse = await controller.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("value"));
  });

  it("Should return 400 if no expireDate is provided", async () => {
    const controller = new InsertBillController();

    const httpRequest = {
      body: {
        name: "valid_name",
        value: "valid_value",
        daysBeforeRemember: 5,
      },
    };

    const httpResponse = await controller.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("expireDate"));
  });

  it("Should return 400 if no daysBeforeRemember is provided", async () => {
    const controller = new InsertBillController();

    const httpRequest = {
      body: {
        name: "valid_name",
        value: "valid_value",
        expireDate: "11/01/1999",
      },
    };

    const httpResponse = await controller.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError("daysBeforeRemember")
    );
  });
});
