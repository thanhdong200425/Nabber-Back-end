"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("likes", {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
            },
            postId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
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
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("likes");
    },
};
