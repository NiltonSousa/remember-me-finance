import { IBillGatewayProtocol } from "../../application/protocols/gateway";
import { IInsertBillUseCase } from "../../domain/usecases";
import { IBillRepository } from "../protocols/repository";

export class BillGateway implements IBillGatewayProtocol {
    constructor(private readonly repo: IBillRepository){}

    insert(bill: IInsertBillUseCase.Params): IInsertBillUseCase.Result {
        return this.repo.insert(bill);
    }
}