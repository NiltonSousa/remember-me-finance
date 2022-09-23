import { HttpResponse } from "../protocols/http";

export const badResquest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});
