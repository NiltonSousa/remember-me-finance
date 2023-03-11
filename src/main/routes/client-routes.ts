import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import {
  makeInsertClientController,
  makeListClientController,
} from "../factories/client";

export const clientRouter = Router();
clientRouter.post("/client", adaptRoute(makeInsertClientController()));
clientRouter.get("/client", adaptRoute(makeListClientController()));
