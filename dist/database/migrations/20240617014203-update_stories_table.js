"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("stories", "expressIn", {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: "5 mins",
        });
    },
    async down(queryInterface, Sequelize) { },
};
