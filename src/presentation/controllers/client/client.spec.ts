import { ClientModel } from "../../../domain/models";
import { ListClient } from "../../../domain/usecases";
import {
  InsertClient,
  InsertClientModel,
} from "../../../domain/usecases/insert-client";
import { MissingParamError } from "../../errors";
import { serverError } from "../../helpers";
import { HttpRequest } from "../../protocols";
import { InsertClientController } from "./insert-client";
import { ListClientController } from "./list-client";

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

const makeListClient = () => {
  class ListClientStub implements ListClient {
    list(clientId: string): Promise<Array<ClientModel>> {
      const fakeClient = [
        {
          id: "valid_id",
          cpf: "valid_cpf",
          name: "valid_name",
          birthdate: "valid_birthdate",
          phoneNumber: "valid_phoneNumber",
          email: "valid_email@mail.com",
          billsCount: "0",
        },
      ];
      return new Promise((resolve) => resolve(fakeClient));
    }
  }

  return new ListClientStub();
};

const makeSutList = () => {
  const listClientStub = makeListClient();

  const sut = new ListClientController(listClientStub);

  return {
    sut,
    listClientStub,
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

describe("List client controller", () => {
  it("Should return 400 if no clientId is provided", async () => {
    const { sut } = makeSutList();

    const httpRequest = {
      queryParams: {},
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("clientId"));
  });

  it("Should return 500 if ListClientController throws", async () => {
    const { sut, listClientStub } = makeSutList();

    jest.spyOn(listClientStub, "list").mockImplementationOnce(() => {
      return new Promise((resolver, reject) => reject(new Error()));
    });

    const httpRequest = {
      queryParams: {
        clientId: "valid_id",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse).toEqual(serverError());
  });

  it("Should return 200 if clientId is provided", async () => {
    const { sut } = makeSutList();

    const httpRequest = {
      queryParams: {
        clientId: "valid_id",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual([
      {
        id: "valid_id",
        cpf: "valid_cpf",
        name: "valid_name",
        birthdate: "valid_birthdate",
        phoneNumber: "valid_phoneNumber",
        email: "valid_email@mail.com",
        billsCount: "0",
      },
    ]);
  });
});
