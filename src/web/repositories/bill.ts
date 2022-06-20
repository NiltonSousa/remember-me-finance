import { PostgresBillRepository } from "../../infra/repositories/bill";
import { IFactory } from "../../presentation/protocols";
import { IBillRepository } from "../../presentation/protocols/repository";

export class BillRepositoryFactory implements IFactory<IBillRepository> {
    make(): IBillRepository {
        return new PostgresBillRepository();
    }
}