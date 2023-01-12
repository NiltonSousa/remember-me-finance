import { RatingModel } from "../../domain/models";
import {
  InsertRatingRepository,
  DbInsertRatingModel,
} from "../protocols/index";
import { DbInsertRating } from "./db-insert-rating";

export interface SutTypes {
  sut: DbInsertRating;
  insertRatingRepositoryStub: InsertRatingRepository;
}

const makeInsertRatingRepository = (): InsertRatingRepository => {
  class InsertRatingRepositoryStub implements InsertRatingRepository {
    async insert(rating: DbInsertRatingModel): Promise<RatingModel> {
      const fakeRating = {
        id: "valid_id",
        clientId: "valid_client_id",
        grade: "5",
        insertedAt: "01/01/2000",
      };
      return new Promise((resolve) => resolve(fakeRating));
    }
  }

  return new InsertRatingRepositoryStub();
};

const makeSut = (): SutTypes => {
  const insertRatingRepositoryStub = makeInsertRatingRepository();
  const sut = new DbInsertRating(insertRatingRepositoryStub);

  return {
    sut,
    insertRatingRepositoryStub,
  };
};

describe("DbInsertRating usecase", () => {
  it("Should throw if InsertRatingRepository throws", async () => {
    const { sut, insertRatingRepositoryStub } = makeSut();

    jest
      .spyOn(insertRatingRepositoryStub, "insert")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const ratingData = {
      id: "valid_id",
      clientId: "valid_client_id",
      grade: "5",
      insertedAt: "01/01/2000",
    };

    const promise = sut.insert(ratingData);

    await expect(promise).rejects.toThrow();
  });

  it("Should call InsertRatingRepository with correct values", async () => {
    const { sut, insertRatingRepositoryStub } = makeSut();

    const insertSpy = jest.spyOn(insertRatingRepositoryStub, "insert");

    const ratingData = {
      id: "valid_id",
      clientId: "valid_client_id",
      grade: "5",
      insertedAt: "01/01/2000",
    };

    await sut.insert(ratingData);

    expect(insertSpy).toHaveBeenCalledWith({
      id: "valid_id",
      clientId: "valid_client_id",
      grade: "5",
      insertedAt: "01/01/2000",
    });
  });

  it("Should return an rating when success", async () => {
    const { sut } = makeSut();

    const ratingData = {
      id: "valid_id",
      clientId: "valid_client_id",
      grade: "5",
      insertedAt: "01/01/2000",
    };

    const bill = await sut.insert(ratingData);

    expect(bill).toEqual({
      id: "valid_id",
      clientId: "valid_client_id",
      grade: "5",
      insertedAt: "01/01/2000",
    });
  });
});
