import { KoaRequestAdapter } from "@/web/adapters/express";
import { insertBillController } from "@/web/factories/assemble/controllers/insertBill";
// import { Router } from "express";
import Router from "koa-router";
import koaBody from "koa-body";

const router = new Router();
const adapter = new KoaRequestAdapter();
// router.use(koaBody());
router.post('/insert', koaBody(), adapter.adapt(insertBillController));

export const billRouter = router.routes();