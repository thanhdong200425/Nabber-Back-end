"use strict";

import { Sequelize, QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.changeColumn("users", "dob", {
            type: DataTypes.DATE,
            allowNull: true,
        });
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.changeColumn("users", "dob", {
            type: DataTypes.DATE,
            allowNull: false,
        });
    },
};
