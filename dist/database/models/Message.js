"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("./sequelize"));
const sequelize_2 = require("sequelize");
const Message = sequelize_1.default.define("message", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_2.DataTypes.INTEGER
    },
    sourceId: {
        allowNull: false,
        type: sequelize_2.DataTypes.INTEGER
    },
    targetId: {
        allowNull: false,
        type: sequelize_2.DataTypes.INTEGER
    },
    sendStatus: {
        allowNull: false,
        type: sequelize_2.DataTypes.SMALLINT,
        comment: "0: Waiting, 1: Accepted, 2: Unsent"
    },
    message: {
        allowNull: false,
        type: sequelize_2.DataTypes.TEXT
    },
    createdAt: {
        allowNull: false,
        type: sequelize_2.DataTypes.DATE,
        defaultValue: sequelize_2.DataTypes.NOW
    },
    updatedAt: {
        allowNull: true,
        type: sequelize_2.DataTypes.DATE
    }
});
exports.default = Message;
