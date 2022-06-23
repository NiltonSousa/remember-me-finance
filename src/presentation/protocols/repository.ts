import { IUpdateBillUseCase } from "@/domain/usecases/updateBill";
import { IInsertBillUseCase } from "../../domain/usecases";

export interface IBillRepository {
    insert(bill: IInsertBillUseCase.Params): IInsertBillUseCase.Result;
    update(bill: IUpdateBillUseCase.Params): IUpdateBillUseCase.Result;
}