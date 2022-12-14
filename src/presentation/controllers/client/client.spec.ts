import { serverError } from "../../helpers";
import { HttpRequest } from "../../protocols";
import { InsertClientController } from "./insert-client";

const makeSutInsertClient = () => {
  return new InsertClientController();
};

describe("Insert Client Controller", () => {
  it("Should return 500 if InsertClientController throws", async () => {
    const sut = makeSutInsertClient();

    const httpRequest: HttpRequest = {
      body: {
        name: "valid_name",
        cpf: "valid_cpf",
        message: "valid_message",
        birthdate: "valid_birthdate",
        email: "valid_email",
        phoneNumber: "valid_number",
        billsCount: "valid_bills_count_id",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse).toEqual(serverError());
  });
});
