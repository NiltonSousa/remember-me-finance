import { Controller } from "../../protocols/controller";

export class InsertBillController implements Controller {
  async handle(httpRequest: any): Promise<any> {
    return {
      statusCode: 400,
      body: "params name is not provided",
    };
  }
}
