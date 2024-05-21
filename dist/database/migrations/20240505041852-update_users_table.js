"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn("users", "dob", {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn("users", "dob", {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        });
    },
};
