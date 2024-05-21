"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
require("dotenv/config");
var _a = process.env, DB_NAME = _a.DB_NAME, DB_USERNAME = _a.DB_USERNAME, DB_PASSWORD = _a.DB_PASSWORD, DB_PORT = _a.DB_PORT, DB_DIALECT = _a.DB_DIALECT, DB_HOST = _a.DB_HOST;
if (!DB_DIALECT || !DB_HOST || !DB_NAME || !DB_PORT || !DB_USERNAME || !DB_PASSWORD)
    throw new Error("Invalid information of database");
var sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "postgres",
});
exports.default = sequelize;
