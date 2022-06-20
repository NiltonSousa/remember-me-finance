import { IBillGatewayProtocol } from "../../../application/protocols/gateway";
import { BillGateway } from "../../../presentation/gateways";
import { IFactory } from "../../../presentation/protocols/factory";
import { IBillRepository } from "../../../presentation/protocols/repository";

export class BillGatewayFactory implements IFactory<IBillGatewayProtocol> {
  constructor(private readonly repository: IBillRepository) {}

  make(): IBillGatewayProtocol {
    return new BillGateway(this.repository);
  }
}
