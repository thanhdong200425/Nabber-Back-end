"use strict";

import { DataTypes, QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.addColumn("stories", "isExpired", {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        });
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {},
};
