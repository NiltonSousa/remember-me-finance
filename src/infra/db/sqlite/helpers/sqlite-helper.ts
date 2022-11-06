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
    const {
      clientId,
      name,
      value,
      expireDate,
      daysBeforeExpireDateToRemember,
    } = bill;
    await this.client.bill.create({
      data: {
        clientId,
        name,
        value,
        expireDate,
        daysBeforeExpireDateToRemember,
      },
    });
  },

  async listBills(clientId: string) {
    return await this.client.bill.findMany({
      where: {
        clientId: {
          equals: clientId,
        },
      },
    });
  },

  async createClient(
    id: string,
    name: string,
    cpf: string,
    birthdate: string,
    email: string,
    phoneNumber: string,
    billsCount: string
  ) {
    await this.client.client.create({
      data: {
        id,
        name,
        cpf,
        birthdate,
        email,
        phoneNumber,
        billsCount,
      },
    });
  },
};
