"use strict";

import { DataTypes, QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.addColumn("stories", "expressIn", {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "5 mins",
        });
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {},
};
