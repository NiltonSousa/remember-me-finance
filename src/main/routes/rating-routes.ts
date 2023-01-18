import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeInsertRatingController } from "../factories/rating";

export const ratingRouter = Router();
ratingRouter.post("/rating", adaptRoute(makeInsertRatingController()));
