import { DbInsertRating } from "../../data/insert-rating/db-insert-rating";
import { InsertRatingSqliteRepository } from "../../infra/db/sqlite/rating-repository/insert-rating";
import { InsertRatingController } from "../../presentation/controllers/rating/insert-rating";

export const makeInsertRatingController = (): InsertRatingController => {
    const ratingSqliteRepository = new InsertRatingSqliteRepository();

    const dbInsertRating = new DbInsertRating(ratingSqliteRepository);
    
    return new InsertRatingController(dbInsertRating);
}