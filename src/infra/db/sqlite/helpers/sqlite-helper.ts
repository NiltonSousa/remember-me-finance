import { Sequelize } from "sequelize";
const { DataTypes } = require("sequelize");

export const SqliteHelper = {
  client: null as any,
  bill: null as any,

  connect(uri?: string) {
    if (!uri) {
      this.client = new Sequelize("sqlite::memory:");
    } else {
      this.client = new Sequelize(uri);
    }
  },

  generateTableBills() {
    this.bill = this.client.define("Bills", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expireDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      daysBeforeExpireDateToRemember: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
};
