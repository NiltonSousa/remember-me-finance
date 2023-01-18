import { RatingModel } from "../models/index";

export interface InsertRatingModel {
  clientId: string;
  grade: string;
  insertedAt: String;
}

export interface InsertRating {
  insert(rating: InsertRatingModel): Promise<RatingModel>;
}
