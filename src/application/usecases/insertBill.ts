import { IInsertBillUseCase } from "../../domain/usecases";
import { IBillGatewayProtocol } from "../protocols/gateway";

export class InsertBillUseCase implements IInsertBillUseCase {
    constructor(private readonly gateway: IBillGatewayProtocol){}

    // TODO - Rever o porque type IInsertBillUseCase não funciona aqui
    async handle(bill: IInsertBillUseCase.Params) {
        const inserted = await this.gateway.insert(bill);

        if(!inserted) {
            throw new Error("Can not insert new bill!");
        }

        return inserted;
    };
}