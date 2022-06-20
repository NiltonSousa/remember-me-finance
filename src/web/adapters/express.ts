/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseController } from "@/presentation/protocols/controller";
// import { Request } from "express";
import { KoaContextHttpRequestMapper } from "../mappers/koaContextHttpRequestMapper";
import { Context } from "koa";

export class KoaRequestAdapter {
  adapt<T, U>(controller: BaseController<T, U>) {
    return async (ctx: Context) => {
      const mapper = new KoaContextHttpRequestMapper<T>();
      const request = mapper.marshall(ctx);

      const controllerResponse = await controller.route(request);

      ctx.body = controllerResponse.body;
      ctx.status = controllerResponse.status;
    };
  }
}
