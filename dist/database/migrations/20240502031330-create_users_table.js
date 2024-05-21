'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const sequelize_1 = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable("users", {
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
    },
    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable("users");
    }
};
