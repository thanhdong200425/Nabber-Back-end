"use strict";

import { DataTypes, QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.changeColumn("users", "phoneNumber", {
            type: DataTypes.INTEGER,
            allowNull: true,
        });
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.changeColumn("users", "phoneNumber", {
            type: DataTypes.SMALLINT,
            allowNull: true,
        });
    },
};
