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
        await queryInterface.createTable("messages", {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER
            },
            source_id: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            target_id: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            send_status: {
                allowNull: false,
                type: DataTypes.SMALLINT,
                comment: "0: Waiting, 1: Accepted, 2: Unsent"
            },
            message: {
                allowNull: false,
                type: DataTypes.TEXT
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },
            updated_at: {
                allowNull: true,
                type: DataTypes.DATE
            }
        })

        await queryInterface.addConstraint("messages", {
            fields: ["source_id"],
            type: "foreign key",
            references: {
                table: "users",
                field: "id"
            },
            onDelete: "cascade",
            onUpdate: "cascade"
        })

        await queryInterface.addConstraint("messages", {
            fields: ["target_id"],
            type: "foreign key",
            references: {
                table: "users",
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
        await queryInterface.dropTable("messages");
    }
};
