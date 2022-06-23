import { HttpRequest, HttpResponse } from "./http";

export interface BaseController<T, U> {
    route(request: HttpRequest<T>): Promise<HttpResponse<U | null>>;
}