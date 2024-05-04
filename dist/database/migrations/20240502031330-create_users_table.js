'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const sequelize_1 = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Add altering commands here.
             *
             * Example:
             * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
             */
            yield queryInterface.createTable("users", {
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
                    type: sequelize_1.DataTypes.INTEGER
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
                    type: sequelize_1.DataTypes.INTEGER,
                    comment: "0: Male, 1: Female"
                },
                lastLogin: {
                    allowNull: false,
                    type: sequelize_1.DataTypes.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
                },
                createdAt: {
                    type: sequelize_1.DataTypes.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
                },
                updatedAt: {
                    type: sequelize_1.DataTypes.DATE,
                    allowNull: true
                }
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Add reverting commands here.
             *
             * Example:
             * await queryInterface.dropTable('users');
             */
            yield queryInterface.dropTable("users");
        });
    }
};
