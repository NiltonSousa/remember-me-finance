import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeInsertClientController } from "../factories/client";

export const clientRouter = Router();
clientRouter.post("/client", adaptRoute(makeInsertClientController()));
