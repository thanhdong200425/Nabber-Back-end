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
        await queryInterface.createTable("posts", {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER
            },
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            content: {
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

        await queryInterface.addConstraint("posts", {
            fields: ['userId'],
            type: "foreign key",
            name: "posts_userId_fkey",
            references: {
                table: "users",
                field: "id"
            },
            onDelete: "cascade",
            onUpdate: 'cascade'
        })
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable("posts");
    }
};
