import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeVerifyPasswordAuthController } from "../factories/auth";

export const authRouter = Router();

authRouter.get("/auth", adaptRoute(makeVerifyPasswordAuthController()));
