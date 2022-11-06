import { ListBillController, InsertBillController } from ".";
import { BillModel } from "../../../domain/models/index";
import {
  InsertBill,
  InsertBillModel,
  ListBill,
} from "../../../domain/usecases/index";
import { MissingParamError } from "../../errors/missing-param-error";
import { serverError } from "../../helpers/http-helper";

export interface SutTypesInsert {
  sut: InsertBillController;
  insertBillStub: InsertBill;
}

// export interface SutTypesList {
//   sut: InsertBillController;
//   insertBillStub: InsertBill;
// }

const makeInsertBill = () => {
  class InsertBillStub implements InsertBill {
    insert(bill: InsertBillModel): Promise<BillModel> {
      const fakeBill = {
        id: "valid_id",
        name: "valid_name",
        value: "valid_value",
        expireDate: "01/01/1999",
        daysBeforeExpireDateToRemember: "5",
      };
      return new Promise((resolve) => resolve(fakeBill));
    }
  }
  return new InsertBillStub();
};

const makeListBill = () => {
  class ListBillStub implements ListBill {
    list(clientId: string): Promise<Array<BillModel>> {
      const fakeBill = [
        {
          id: "valid_id",
          clientId: "valid_id",
          name: "valid_name",
          value: "valid_value",
          expireDate: "01/01/1999",
          daysBeforeExpireDateToRemember: "5",
        },
      ];

      return new Promise((resolve) => resolve(fakeBill));
    }
  }

  return new ListBillStub();
};

const makeSutInsert = (): SutTypesInsert => {
  const insertBillStub = makeInsertBill();

  const sut = new InsertBillController(insertBillStub);

  return {
    sut,
    insertBillStub,
  };
};

const makeSutList = () => {
  const listBillStub = makeListBill();

  const sut = new ListBillController(listBillStub);

  return {
    sut,
    listBillStub,
  };
};

describe("Insert bill controller", () => {
  it("Should return 400 if no name is provided", async () => {
    const { sut } = makeSutInsert();

    const httpRequest = {
      body: {
        value: "valid_value",
        expireDate: "11/01/1999",
        daysBeforeExpireDateToRemember: "5",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  it("Should return 400 if no value is provided", async () => {
    const { sut } = makeSutInsert();

    const httpRequest = {
      body: {
        name: "valid_name",
        expireDate: "11/01/1999",
        daysBeforeExpireDateToRemember: "5",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("value"));
  });

  it("Should return 400 if no expireDate is provided", async () => {
    const { sut } = makeSutInsert();

    const httpRequest = {
      body: {
        name: "valid_name",
        value: "valid_value",
        daysBeforeExpireDateToRemember: "5",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("expireDate"));
  });

  it("Should return 400 if no daysBeforeExpireDateToRemember is provided", async () => {
    const { sut } = makeSutInsert();

    const httpRequest = {
      body: {
        name: "valid_name",
        value: "valid_value",
        expireDate: "11/01/1999",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError("daysBeforeExpireDateToRemember")
    );
  });

  it("Should return 200 if data is provided", async () => {
    const { sut } = makeSutInsert();

    const httpRequest = {
      body: {
        name: "valid_name",
        value: "valid_value",
        expireDate: "01/01/1999",
        daysBeforeExpireDateToRemember: "5",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: "valid_id",
      name: "valid_name",
      value: "valid_value",
      expireDate: "01/01/1999",
      daysBeforeExpireDateToRemember: "5",
    });
  });

  it("Should return 500 if InsertBillController throws", async () => {
    const { sut, insertBillStub } = makeSutInsert();

    jest.spyOn(insertBillStub, "insert").mockImplementationOnce(() => {
      return new Promise((resolver, reject) => reject(new Error()));
    });

    const httpRequest = {
      body: {
        name: "valid_name",
        value: "valid_value",
        expireDate: "01/01/1999",
        daysBeforeExpireDateToRemember: "5",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse).toEqual(serverError());
  });
});

describe("List bill controller", () => {
  it("Should return 400 if no clientId is provided", async () => {
    const { sut } = makeSutList();

    const httpRequest = {
      queryParams: {},
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("clientId"));
  });
});
