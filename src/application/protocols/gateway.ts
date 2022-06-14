import { IInsertBillUseCase } from "../../domain/usecases";

export interface IBillGatewayProtocol {
    insert(bill: IInsertBillUseCase.Params): IInsertBillUseCase.Result;
}