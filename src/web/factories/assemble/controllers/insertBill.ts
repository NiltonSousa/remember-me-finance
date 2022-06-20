import { billGateway } from "../gateways";
import { InsertBillUseCaseFactory } from "../../usecases/insertBill";
import { InsertBillControllerFactory } from "../../controllers/insertBill";

const insertBillUseCase = new InsertBillUseCaseFactory(billGateway).make();
const insertBillController = new InsertBillControllerFactory(insertBillUseCase).make();

export { insertBillController };