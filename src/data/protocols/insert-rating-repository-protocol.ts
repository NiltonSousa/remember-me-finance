import { RatingModel } from "../../domain/models";
import { DbInsertRatingModel } from "./index";

export interface InsertRatingRepository {
  insert(rating: DbInsertRatingModel): Promise<RatingModel>;
}
