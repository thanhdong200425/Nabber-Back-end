"use strict";

import { DataTypes, QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.createTable("likes", {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            postId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        });

        await queryInterface.addConstraint("likes", {
            fields: ["postId"],
            type: "foreign key",
            name: "likes_postId_fkey",
            references: {
                table: "posts",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        });

        await queryInterface.addConstraint("likes", {
            fields: ["userId"],
            type: "foreign key",
            name: "likes_userId_fkey",
            references: {
                table: "users",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        });

        await queryInterface.addConstraint("likes", {
            fields: ["postId", "userId"],
            type: "unique",
            name: "likes_unique",
        });
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.dropTable("likes");
    },
};
