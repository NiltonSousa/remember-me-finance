import { DbInsertRatingModel } from "../../../../data/protocols";
import { RatingModel } from "../../../../domain/models";

export const map = (
  ratingData: DbInsertRatingModel,
  generatedId: string
): Promise<RatingModel> => {
  const { clientId, grade, insertedAt } = ratingData;

  return new Promise((resolve) =>
    resolve({
      id: generatedId,
      clientId,
      grade,
      insertedAt,
    })
  );
};
