import { RatingModel } from "../../../domain/models";
import { InsertRating, InsertRatingModel } from "../../../domain/usecases";
import { MissingParamError } from "../../errors";
import { serverError } from "../../helpers/http-helper";
import { InsertRatingController } from "./insert-rating";

describe("Insert Rating Controller", () => {
  const makeInsertRating = () => {
    class InsertRatingStub implements InsertRating {
      insert(rating: InsertRatingModel): Promise<RatingModel> {
        const fakeRating = {
          id: "valid_id",
          clientId: "valid_client_id",
          grade: "5",
          insertedAt: "10/01/2023",
        };
        return new Promise((resolve) => resolve(fakeRating));
      }
    }
    return new InsertRatingStub();
  };

  const makeSutInsert = () => {
    const insertRatingStub = makeInsertRating();

    const sut = new InsertRatingController(insertRatingStub);

    return {
      sut,
      insertRatingStub,
    };
  };

  it("Should return 500 if InsertRatingController throws", async () => {
    const { sut, insertRatingStub } = makeSutInsert();

    jest.spyOn(insertRatingStub, "insert").mockImplementationOnce(() => {
      return new Promise((resolve, reject) => reject(new Error()));
    });

    const httpRequest = {
      body: {
        clientId: "valid_client_id",
        grade: "5",
      },
    };

    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toBe(500);
    expect(response).toEqual(serverError());
  });

  it("Should return 400 when no clientId is provided", async () => {
    const { sut } = makeSutInsert();

    const httpRequest = {
      body: {
        grade: "5",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("clientId"));
  });

  it("Should return 400 when no grade is provided", async () => {
    const { sut } = makeSutInsert();

    const httpRequest = {
      body: {
        clientId: "valid_client_id",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("grade"));
  });

  it("Should return 200 if data is provided", async () => {
    const { sut } = makeSutInsert();

    const httpRequest = {
      body: {
        clientId: "valid_client_id",
        grade: "5",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: "valid_id",
      clientId: "valid_client_id",
      grade: "5",
      insertedAt: "10/01/2023",
    });
  });
});
