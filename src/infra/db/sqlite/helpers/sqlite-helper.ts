import { PrismaClient } from "@prisma/client";
import { DbInsertBillModel } from "../../../../data/protocols";
import setEnv from "../../../../main/config/env";

export const SqliteHelper = {
  client: null as any,
  bill: null as any,

  async connect(type?: string) {
    if (type == "test") {
      process.env.DATABASE_URL = setEnv.sqliteUrlTest;
      this.client = new PrismaClient({
        log: ["query"],
      });
    } else {
      process.env.DATABASE_URL = setEnv.sqliteUrl;
      this.client = new PrismaClient({
        log: ["query"],
      });
    }
  },

  async createBill(bill: DbInsertBillModel) {
    const { name, value, expireDate, daysBeforeExpireDateToRemember } = bill;
    await this.client.bill.create({
      data: {
        name,
        value,
        expireDate,
        daysBeforeExpireDateToRemember,
      },
    });
  },
};
