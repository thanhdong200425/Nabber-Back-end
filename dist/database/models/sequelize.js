"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require("dotenv/config");
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DIALECT, DB_HOST } = process.env;
if (!DB_DIALECT || !DB_HOST || !DB_NAME || !DB_PORT || !DB_USERNAME || !DB_PASSWORD)
    throw new Error("Invalid information of database");
const sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "postgres",
});
exports.default = sequelize;
