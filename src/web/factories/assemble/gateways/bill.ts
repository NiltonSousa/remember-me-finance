import { BillRepositoryFactory } from "../../../repositories";
import { BillGatewayFactory } from "../../gateway";


const repository = new BillRepositoryFactory().make();
const billGateway = new BillGatewayFactory(repository).make();

export { billGateway };