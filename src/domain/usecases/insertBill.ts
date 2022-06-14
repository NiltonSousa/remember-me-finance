import { Bill } from "../models";

export interface IInsertBillUseCase {
    handle(bill: IInsertBillUseCase.Params): IInsertBillUseCase.Result;
}

export namespace IInsertBillUseCase {
    export type Params = Bill;
    export type Result = Promise<Bill>;
}