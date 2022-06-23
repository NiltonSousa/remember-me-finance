import { Bill } from "../models";

export interface IUpdateBillUseCase {
    handle(bill: IUpdateBillUseCase.Params): IUpdateBillUseCase.Result;
}

export namespace IUpdateBillUseCase {
    export type Params = Bill;
    export type Result = Promise<Bill | null>;
}