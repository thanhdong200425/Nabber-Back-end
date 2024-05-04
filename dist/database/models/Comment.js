"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("./sequelize"));
const sequelize_2 = require("sequelize");
const Comment = sequelize_1.default.define("comment", {
    id: {
        primaryKey: true,
        type: sequelize_2.DataTypes.INTEGER,
        autoIncrement: true
    },
    userId: {
        allowNull: false,
        type: sequelize_2.DataTypes.INTEGER
    },
    postId: {
        allowNull: false,
        type: sequelize_2.DataTypes.INTEGER
    },
    content: {
        type: sequelize_2.DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_2.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_2.DataTypes.NOW
    },
    updatedAt: {
        type: sequelize_2.DataTypes.DATE,
        allowNull: true
    }
});
exports.default = Comment;
