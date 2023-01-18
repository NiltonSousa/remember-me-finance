import {
  DbInsertRatingModel,
  InsertRatingRepository,
} from "../../../../data/protocols/index";
import { SqliteHelper } from "../helpers/sqlite-helper";
import ShortUniqueId from "short-unique-id";
import { map } from "./rating-mapper";
import { RatingModel } from "../../../../domain/models";

export class InsertRatingSqliteRepository implements InsertRatingRepository {
  async insert(rating: DbInsertRatingModel): Promise<RatingModel> {
    const generateId = new ShortUniqueId({ length: 6 });
    const code = String(generateId()).toUpperCase();
    await SqliteHelper.createRating({id: code, ...rating});

    return map(rating, code);
  }
}
