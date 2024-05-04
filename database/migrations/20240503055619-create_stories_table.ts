'use strict';

import {DataTypes, QueryInterface, Sequelize} from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable("stories", {
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true
            },
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            content: {
                allowNull: true,
                type: DataTypes.TEXT
            },
            image: {
                allowNull: true,
                type: DataTypes.TEXT
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },
            updatedAt: {
                allowNull: true,
                type: DataTypes.DATE
            }
        })

        await queryInterface.addConstraint("stories", {
            type: "foreign key",
            fields: ['userId'],
            references: {
                table: "users",
                field: 'id'
            },
            onUpdate: "cascade",
            onDelete: "cascade"
        })
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable("stories");
    }
};
