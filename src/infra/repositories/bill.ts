import { Bill } from "../../domain/models";
import { IBillRepository } from "../../presentation/protocols/repository";
import { PostgresClient } from "../postgressClient";

export class PostgresBillRepository implements IBillRepository {
    async insert(bill: Bill): Promise<Bill | null> {
        const client = new PostgresClient();
        return await client.insert(bill);
    }
}