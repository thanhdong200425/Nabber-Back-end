"use strict";

import { DataTypes, QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.addColumn("users", "coverImage", {
            type: DataTypes.TEXT,
            allowNull: true,
        });

        await queryInterface.addColumn("users", "username", {
            type: DataTypes.TEXT,
            allowNull: true,
        });

        await queryInterface.addColumn("users", "loginToken", {
            type: DataTypes.TEXT,
            allowNull: false,
        });
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.removeColumn("users", "username");
        await queryInterface.removeColumn("users", "coverImage");
        await queryInterface.removeColumn("users", "loginToken");
    },
};
