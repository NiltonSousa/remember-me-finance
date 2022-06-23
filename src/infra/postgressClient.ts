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


    async update(bill: Bill) {
        const { name, value, expireDate } = bill;
        const rows =  await this.pool.query("UPDATE bill SET name=$1, value=$2, expireDate=$3 WHERE name=$1", [name, value, expireDate]);

        if(rows) {
            return bill!
        }
        return  null;
    }
}