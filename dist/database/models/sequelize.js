"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DIALECT, DB_HOST } = process.env;
if (!DB_DIALECT || !DB_HOST || !DB_NAME || !DB_PORT || !DB_USERNAME || !DB_PASSWORD)
    throw new Error("Invalid information of database");
const sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "postgres"
});
exports.default = sequelize;
