import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import {
  makeDeleteBillController,
  makeInsertBillController,
  makeListBillController,
} from "../factories/bill";

export const billRouter = Router();

billRouter.post("/bill", adaptRoute(makeInsertBillController()));
billRouter.get("/bill", adaptRoute(makeListBillController()));
billRouter.delete("/bill", adaptRoute(makeDeleteBillController()));
