"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("notifications", {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            senderId: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            receiverId: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            notificationTypeId: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            postId: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            isRead: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            content: {
                type: sequelize_1.DataTypes.TEXT,
            },
            imageUrl: {
                type: sequelize_1.DataTypes.TEXT,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
            },
        });
        await queryInterface.addConstraint("notifications", {
            type: "foreign key",
            fields: ["senderId"],
            name: "notification_senderId_fkey",
            references: {
                table: "users",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        });
        await queryInterface.addConstraint("notifications", {
            type: "foreign key",
            fields: ["receiverId"],
            name: "notification_reveiverId_fkey",
            references: {
                table: "users",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        });
        await queryInterface.addConstraint("notifications", {
            type: "foreign key",
            fields: ["notificationTypeId"],
            name: "notification_notificationTypeId_fkey",
            references: {
                table: "notification_types",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        });
        await queryInterface.addConstraint("notifications", {
            type: "foreign key",
            fields: ["postId"],
            name: "notification_postId_fkey",
            references: {
                table: "posts",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("notifications");
    },
};
