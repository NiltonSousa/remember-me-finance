import { Sequelize } from "sequelize";
const { DataTypes } = require("sequelize");

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

export const Bill = sequelize.define("Bills", {
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
