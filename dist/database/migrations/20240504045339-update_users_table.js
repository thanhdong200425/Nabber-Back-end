"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addConstraint("users", {
            fields: ["email"],
            type: "unique",
            name: "email_unique_constraint",
        });
        await queryInterface.changeColumn("users", "phoneNumber", {
            type: sequelize_1.DataTypes.INTEGER,
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint("users", "email_unique_constraint");
    },
};
