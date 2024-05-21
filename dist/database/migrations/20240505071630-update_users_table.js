"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn("users", "phoneNumber", {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn("users", "phoneNumber", {
            type: sequelize_1.DataTypes.SMALLINT,
            allowNull: true,
        });
    },
};
