import { RatingModel } from "../../domain/models";
import {
  DbInsertRatingModel,
  InsertRatingModel,
  InsertRatingRepository,
} from "../protocols/index";

export class DbInsertRating implements InsertRatingModel {
  private readonly insertRatingRepository: InsertRatingRepository;

  constructor(insertRatingRepository: InsertRatingRepository) {
    this.insertRatingRepository = insertRatingRepository;
  }

  async insert(ratingData: DbInsertRatingModel): Promise<RatingModel> {
    return await this.insertRatingRepository.insert(ratingData);
  }
}
