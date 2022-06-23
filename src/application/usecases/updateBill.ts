import { IUpdateBillUseCase } from "@/domain/usecases";
import { IBillGatewayProtocol } from "../protocols/gateway";

export class UpdateBillUseCase implements IUpdateBillUseCase {
    constructor(private readonly gateway: IBillGatewayProtocol){}

    async handle(bill: IUpdateBillUseCase.Params) {
        const updated = await this.gateway.update(bill);

        if(!updated) {
            throw new Error("Can not update bill!");
        }

        return updated;
    };
}