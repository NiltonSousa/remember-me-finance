import { UpdateBillUseCase } from "@/application/usecases/updateBill";
import { IBillGatewayProtocol } from "../../../application/protocols/gateway";
import { IFactory } from "../../../presentation/protocols";

export class UpdateBillUseCaseFactory implements IFactory<UpdateBillUseCase> {
    constructor(private readonly gateway: IBillGatewayProtocol) { }
    make(): UpdateBillUseCase {
        return new UpdateBillUseCase(this.gateway);
    }
}