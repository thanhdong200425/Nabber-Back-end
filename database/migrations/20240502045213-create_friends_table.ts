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
        await queryInterface.createTable("friends", {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER
            },
            sourceId: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            targetId: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            status: {
                allowNull: false,
                type: DataTypes.SMALLINT,
                comment: "0: Waiting, 1: Accepted, 2: Canceled"
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            }
        })

        await queryInterface.addConstraint('friends', {
            fields: ['sourceId'],
            type: "foreign key",
            references: {
                table: "users",
                field: "id"
            },
            onDelete: "cascade",
            onUpdate: "cascade"
        })

        await queryInterface.addConstraint('friends', {
            fields: ['targetId'],
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
        await queryInterface.dropTable("friends")
    }
};
