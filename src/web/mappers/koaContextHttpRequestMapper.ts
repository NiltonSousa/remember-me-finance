import { HttpRequest } from "@/presentation/protocols/http";
import { IMapper } from "@/presentation/protocols/mapper";
import { Context } from "koa";

export class KoaContextHttpRequestMapper<T>
  implements IMapper<Partial<Context>, HttpRequest<T>>
{
  marshall(ctx: Context): HttpRequest<T> {
    return {
      body: ctx.request.body as T,
      headers: ctx.headers,
      // queryParams: ctx.query,
      pathParams: ctx.params,
    };
  }

  unmarshall(model: HttpRequest<T>): Partial<Context> {
    return {
      body: model.body,
      headers: model.headers,
      // query: model.queryParams,
    };
  }
}
