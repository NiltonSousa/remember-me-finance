import Koa, { DefaultState, DefaultContext } from "koa";

export async function setupKoaServer(app: Koa<DefaultState, DefaultContext>) {
  app.listen(8000, () => console.log("running"));
  return app;
}
