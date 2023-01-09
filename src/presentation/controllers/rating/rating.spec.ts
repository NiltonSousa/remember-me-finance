import { RatingModel } from "../../../domain/models";
import { InsertRating, InsertRatingModel } from "../../../domain/usecases";
import { serverError } from "../../helpers/http-helper";
import { InsertRatingController } from "./rating";

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

    const sut = new InsertRatingController();

    return {
      sut,
      insertRatingStub,
    };
  };

  it("Should return 500 if InsertRatingController throws", async () => {
    const { sut, insertRatingStub } = makeSutInsert();

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
});
