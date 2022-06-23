import { Bill } from "../../domain/models";
import { IUpdateBillUseCase } from "../../domain/usecases";
import { BaseController } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class UpdateBillController implements BaseController<Bill, Bill | null> {
    constructor(private readonly updateBillUseCase: IUpdateBillUseCase) {}

    async route(request: HttpRequest<Bill>): Promise<HttpResponse<Bill | null>> {
        return {
            body: await this.updateBillUseCase.handle({
                name: request.body.name,
                value: request.body.value,
                expireDate: request.body.expireDate
            }),
            status: 200,
            headers:{}
        }
    }
}