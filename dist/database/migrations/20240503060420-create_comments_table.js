"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable("comments", {
            id: {
                primaryKey: true,
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
            },
            userId: {
                allowNull: false,
                type: sequelize_1.DataTypes.INTEGER,
            },
            postId: {
                allowNull: false,
                type: sequelize_1.DataTypes.INTEGER,
            },
            content: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            },
        });
        await queryInterface.addConstraint("comments", {
            fields: ["userId"],
            type: "foreign key",
            references: {
                table: "users",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        });
        await queryInterface.addConstraint("comments", {
            fields: ["postId"],
            type: "foreign key",
            references: {
                table: "posts",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        });
    },
    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable("comments");
    },
};
