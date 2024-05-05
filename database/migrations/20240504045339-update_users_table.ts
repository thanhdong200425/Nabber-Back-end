"use strict";

import { DataTypes, QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.addConstraint("users", {
            fields: ["email"],
            type: "unique",
            name: "email_unique_constraint",
        });

        await queryInterface.changeColumn("users", "phoneNumber", {
            type: DataTypes.INTEGER,
        });
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.removeConstraint("users", "email_unique_constraint");
    },
};
