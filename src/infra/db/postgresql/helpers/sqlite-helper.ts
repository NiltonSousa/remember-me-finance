import { PrismaClient } from "@prisma/client";
import {
  DbInsertBillModel,
  DbInsertNotificationModel,
  DbInsertRatingModel,
} from "../../../../data/protocols";
import setEnv from "../../../../main/config/env";

export const SqliteHelper = {
  client: null as any,

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

  async disconnect() {
    await this.client.$disconnect();
  },

  async createBill(bill: DbInsertBillModel) {
    const {
      id,
      clientId,
      name,
      value,
      expireDate,
      daysBeforeExpireDateToRemember,
    } = bill;
    await this.client.bill.create({
      data: {
        id,
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

  async listBillsToSendEmail(dateNow: string, dateAfter: string) {
    return await this.client.bill.findMany({
      where: {
        expireDate: {
          lte: new Date(dateAfter),
          gte: new Date(dateNow),
        },
      },
      include: {
        notification: true,
        client: true,
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

  async createNotification(notification: DbInsertNotificationModel) {
    const { billId, type, message } = notification;
    await this.client.notification.create({
      data: {
        billId,
        type,
        message,
      },
    });
  },

  async createRating(rating: DbInsertRatingModel) {
    const { id, clientId, grade, insertedAt } = rating;
    await this.client.rating.create({
      data: {
        id,
        clientId,
        grade,
        insertedAt,
      },
    });
  },
};
