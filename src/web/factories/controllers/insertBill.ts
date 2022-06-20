import { InsertBillUseCase } from "../../../application/usecases/insertBill";
import { InsertBillController } from "../../../presentation/controllers/insertBill";
import { IFactory } from "../../../presentation/protocols";

export class InsertBillControllerFactory implements IFactory<InsertBillController>{
    constructor(private readonly insertBillUseCase: InsertBillUseCase){}

    make(): InsertBillController{
        return new InsertBillController(this.insertBillUseCase);
    }
}