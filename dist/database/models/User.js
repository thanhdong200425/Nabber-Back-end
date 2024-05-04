"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./sequelize"));
const User = sequelize_2.default.define('user', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    email: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    phoneNumber: {
        allowNull: true,
        type: sequelize_1.DataTypes.SMALLINT
    },
    passwordHash: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT
    },
    address: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT
    },
    dob: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    },
    country: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    givenName: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT
    },
    givenSurname: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT
    },
    gender: {
        allowNull: true,
        type: sequelize_1.DataTypes.SMALLINT,
        comment: "0: Male, 1: Female"
    },
    lastLogin: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    image: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    }
});
exports.default = User;
