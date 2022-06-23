import { IInsertBillUseCase, IUpdateBillUseCase} from "../../domain/usecases";

export interface IBillGatewayProtocol {
    insert(bill: IInsertBillUseCase.Params): IInsertBillUseCase.Result;
    update(bill: IUpdateBillUseCase.Params): IUpdateBillUseCase.Result;
}