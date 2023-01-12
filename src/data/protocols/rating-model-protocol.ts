import { RatingModel } from "../../domain/models";

export interface DbInsertRatingModel {
  id?: string;
  clientId: string;
  grade: string;
  insertedAt: string;
}

export interface InsertRatingModel {
  insert(bill: DbInsertRatingModel): Promise<RatingModel>;
}
