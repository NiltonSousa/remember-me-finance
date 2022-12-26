import { ClientModel } from "../../../domain/models";
import {
  InsertClient,
  InsertClientModel,
} from "../../../domain/usecases/insert-client";
import { MissingParamError } from "../../errors";
import { serverError } from "../../helpers";
import { HttpRequest } from "../../protocols";
import { InsertClientController } from "./insert-client";

const makeInsertClient = () => {
  class InsertClientStub implements InsertClient {
    insert(client: InsertClientModel): Promise<ClientModel> {
      const fakeClient = {
        id: "valid_id",
        name: "valid_name",
        cpf: "valid_cpf",
        message: "valid_message",
        birthdate: "valid_birthdate",
        email: "valid_email",
        phoneNumber: "valid_number",
        billsCount: "valid_bills_count_id",
      };

      return new Promise((resolve) => {
        resolve(fakeClient);
      });
    }
  }
  return new InsertClientStub();
};

const makeSutInsert = () => {
  const insertClientStub = makeInsertClient();

  const sut = new InsertClientController(insertClientStub);

  return {
    sut,
    insertClientStub,
  };
};

describe("Insert Client Controller", () => {
  it("Should return 500 if InsertClientController throws", async () => {
    const { sut, insertClientStub } = makeSutInsert();

    jest.spyOn(insertClientStub, "insert").mockImplementationOnce(
      () =>
        new Promise((resolve, reject) => {
          reject(new Error());
        })
    );

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

  it("Should return 400 if no name is provided", async () => {
    const { sut } = makeSutInsert();

    const httpRequest: HttpRequest = {
      body: {
        cpf: "valid_cpf",
        birthdate: "valid_birthdate",
        email: "valid_email",
        phoneNumber: "valid_number",
        billsCount: "valid_bills_count_id",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });
});
