import { IBillGatewayProtocol } from "../../../application/protocols/gateway";
import { InsertBillUseCase } from "../../../application/usecases";
import { IFactory } from "../../../presentation/protocols";

export class InsertBillUseCaseFactory implements IFactory<InsertBillUseCase> {
    constructor(private readonly gateway: IBillGatewayProtocol) { }
    make(): InsertBillUseCase {
        return new InsertBillUseCase(this.gateway);
    }
}