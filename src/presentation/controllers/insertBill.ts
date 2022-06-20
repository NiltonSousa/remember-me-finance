import { Bill } from "../../domain/models";
import { IInsertBillUseCase } from "../../domain/usecases";
import { BaseController } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class InsertBillController implements BaseController<Bill, null> {
    constructor(private readonly insertBillUseCase: IInsertBillUseCase) {}

    async route(request: HttpRequest<Bill>): Promise<HttpResponse<Bill | null>>{
        return {
            body: await this.insertBillUseCase.handle({
                name: request.body.name,
                value: request.body.value,
                expireDate: request.body.expireDate
            }),
            status: 200,
            headers:{}
        }
    }
}