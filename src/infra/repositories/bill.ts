import { IUpdateBillUseCase } from "@/domain/usecases/updateBill";
import { Bill } from "../../domain/models";
import { IBillRepository } from "../../presentation/protocols/repository";
import { PostgresClient } from "../postgressClient";

export class PostgresBillRepository implements IBillRepository {
    async insert(bill: Bill): Promise<Bill | null> {
        const client = new PostgresClient();
        return await client.insert(bill);
    }

    async update(bill: Bill): IUpdateBillUseCase.Result {
        const client = new PostgresClient();
        return await client.update(bill);
    }
}