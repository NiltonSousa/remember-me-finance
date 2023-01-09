import { RatingModel } from "../models/index";

export interface InsertRatingModel {
  clientId: string;
  grade: string;
}

export interface InsertRating {
  insert(rating: InsertRatingModel): Promise<RatingModel>;
}
