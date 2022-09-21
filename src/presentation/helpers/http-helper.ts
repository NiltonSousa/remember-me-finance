import { HttpResponse } from "../protocols/http";

export const badResquest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});
