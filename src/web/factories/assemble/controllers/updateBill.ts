import { billGateway } from "../gateways";
import { UpdateBillUseCaseFactory } from "../../usecases/updateBill";
import { UpdateBillControllerFactory } from "../../controllers/updateBill";

const updateBillUseCase = new UpdateBillUseCaseFactory(billGateway).make();
const updateBillController = new UpdateBillControllerFactory(updateBillUseCase).make();

export { updateBillController };