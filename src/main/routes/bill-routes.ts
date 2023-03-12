import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import {
  makeDeleteBillController,
  makeInsertBillController,
  makeListBillController,
  makeUpdateBillController,
} from "../factories/bill";

export const billRouter = Router();

billRouter.post("/bill", adaptRoute(makeInsertBillController()));
billRouter.put("/bill", adaptRoute(makeUpdateBillController()));
billRouter.get("/bill", adaptRoute(makeListBillController()));
billRouter.delete("/bill", adaptRoute(makeDeleteBillController()));
