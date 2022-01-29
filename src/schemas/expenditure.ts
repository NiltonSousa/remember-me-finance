const database = require('../database/db');
const Seq = require('sequelize');
 
const Expenditure = database.define('expenditure', {
    id: {
        type: Seq.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    companyName: {
        type: Seq.STRING    },
    validAt: {
        type: Seq.STRING
    },
    value: {
        type: Seq.NUMBER
    }
})
 
module.exports = Expenditure;