'use strict';
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
        await queryInterface.createTable("messages", {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER
            },
            sourceId: {
                allowNull: false,
                type: sequelize_1.DataTypes.INTEGER
            },
            targetId: {
                allowNull: false,
                type: sequelize_1.DataTypes.INTEGER
            },
            sendStatus: {
                allowNull: false,
                type: sequelize_1.DataTypes.SMALLINT,
                comment: "0: Waiting, 1: Accepted, 2: Unsent"
            },
            message: {
                allowNull: false,
                type: sequelize_1.DataTypes.TEXT
            },
            createdAt: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },
            updatedAt: {
                allowNull: true,
                type: sequelize_1.DataTypes.DATE
            }
        });
        await queryInterface.addConstraint("messages", {
            fields: ["sourceId"],
            type: "foreign key",
            references: {
                table: "users",
                field: "id"
            },
            onDelete: "cascade",
            onUpdate: "cascade"
        });
        await queryInterface.addConstraint("messages", {
            fields: ["targetId"],
            type: "foreign key",
            references: {
                table: "users",
                field: "id"
            },
            onDelete: "cascade",
            onUpdate: "cascade"
        });
    },
    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable("messages");
    }
};
