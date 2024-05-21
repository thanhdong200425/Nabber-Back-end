"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("users", "coverImage", {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        });
        await queryInterface.addColumn("users", "username", {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        });
        await queryInterface.addColumn("users", "loginToken", {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("users", "username");
        await queryInterface.removeColumn("users", "coverImage");
        await queryInterface.removeColumn("users", "loginToken");
    },
};
