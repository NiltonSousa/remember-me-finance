import { KoaRequestAdapter } from "@/web/adapters/express";
import { insertBillController } from "@/web/factories/assemble/controllers/insertBill";
// import { Router } from "express";
import Router from "koa-router";
import koaBody from "koa-body";
import { updateBillController } from "@/web/factories/assemble/controllers/updateBill";

const router = new Router();
const adapter = new KoaRequestAdapter();
router.post('/insert', koaBody(), adapter.adapt(insertBillController));
router.put('/update', koaBody(), adapter.adapt(updateBillController));

export const billRouter = router.routes();