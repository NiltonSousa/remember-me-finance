import { IInsertBillUseCase } from "../../domain/usecases";

export interface IBillRepository {
    insert(bill: IInsertBillUseCase.Params): IInsertBillUseCase.Result;
}