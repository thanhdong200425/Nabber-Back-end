"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("./sequelize"));
const sequelize_2 = require("sequelize");
const Story = sequelize_1.default.define("story", {
    id: {
        primaryKey: true,
        type: sequelize_2.DataTypes.INTEGER,
        autoIncrement: true
    },
    userId: {
        allowNull: false,
        type: sequelize_2.DataTypes.INTEGER,
    },
    content: {
        allowNull: true,
        type: sequelize_2.DataTypes.TEXT
    },
    image: {
        allowNull: true,
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
exports.default = Story;
