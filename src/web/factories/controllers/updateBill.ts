import { UpdateBillUseCase } from "@/application/usecases/updateBill";
import { UpdateBillController } from "@/presentation/controllers/updateBill";
import { IFactory } from "../../../presentation/protocols";

export class UpdateBillControllerFactory implements IFactory<UpdateBillController>{
    constructor(private readonly insertBillUseCase: UpdateBillUseCase){}

    make(): UpdateBillController{
        return new UpdateBillController(this.insertBillUseCase);
    }
}