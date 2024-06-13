"use strict";

import { DataTypes, QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.createTable("notifications", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            senderId: {
                type: DataTypes.INTEGER,
            },
            receiverId: {
                type: DataTypes.INTEGER,
            },
            notificationTypeId: {
                type: DataTypes.INTEGER,
            },
            postId: {
                type: DataTypes.INTEGER,
            },
            isRead: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            content: {
                type: DataTypes.TEXT,
            },
            imageUrl: {
                type: DataTypes.TEXT,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                type: DataTypes.DATE,
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

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.dropTable("notifications");
    },
};
