// import express from "express";
// import { ExpressRequestAdapter } from "../adapters/express";
// import { insertBillController } from "@/web/factories/assemble/controllers/insertBill";

// const app = express();
// // const port = process.env.PORT;

// const adapter = new ExpressRequestAdapter();

// app.post('/insert', adapter.adapt(insertBillController));

// app.get('/teste', (req, res) => {
//     console.log("req", req)
//     res.send("ok");
// });

// app.listen(8000, () => {
//     console.log("Server listening on port -->", 8000);
// })


// export default app;

// import { koaErrorMiddleware, koaAuthMiddleware } from "../factories/assemble";
import logger from "koa-logger";
import koaBody from "koa-body";
import Koa from "koa";
import { billRouter } from "./routes/bill";

const app = new Koa();

app.use(
  logger((_, args) => {
    const [, , url, status] = args;

    if (url !== "/" && status) {
      console.log(...args);
    }
  })
);

app.use(billRouter);

// app.use(koaAuthMiddleware);
// app.use(koaErrorMiddleware);
app.use(koaBody());

export default app;
