import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../presentation/protocols/index";
import { Request, Response } from "express";

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpResquest: HttpRequest = {
      body: req.body,
    };
    const httpResponse: HttpResponse = await controller.handle(httpResquest);

    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
