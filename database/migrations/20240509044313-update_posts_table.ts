"use strict";

import { DataTypes, QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.addColumn("posts", "image", {
            type: DataTypes.TEXT,
            allowNull: true,
        });
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.removeColumn("posts", "image");
    },
};
