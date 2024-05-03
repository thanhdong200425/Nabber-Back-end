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
        await queryInterface.createTable('comments', {
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true
            },
            user_id: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            post_id: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true
            }
        });

        await queryInterface.addConstraint("comments", {
            fields: ['user_id'],
            type: "foreign key",
            references: {
                table: "users",
                field: "id"
            },
            onDelete: "cascade",
            onUpdate: "cascade"
        })

        await queryInterface.addConstraint("comments", {
            fields: ['post_id'],
            type: "foreign key",
            references: {
                table: "posts",
                field: "id"
            },
            onDelete: "cascade",
            onUpdate: "cascade"
        })
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable("comments");
    }
};
