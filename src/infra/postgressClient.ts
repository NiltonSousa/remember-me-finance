import { Bill } from "../domain/models/bill";
import { Pool } from "pg";

export class PostgresClient {
    public pool: Pool;

    constructor() { 
        this.pool = new Pool({
          user: 'postgres',
          host: 'localhost',
          database: 'postgres',
          password: 'postgres',
          port: 5432,
        })
    }

    async insert(bill: Bill) {
        const { name, value, expireDate } = bill;
        const rows =  await this.pool.query("INSERT INTO bill VALUES($1, $2, $3)", [name, value, expireDate]);

        if(rows) {
            return bill!
        }
        return  null;
    }
}