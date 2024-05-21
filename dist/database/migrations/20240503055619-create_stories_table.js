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
        await queryInterface.createTable("stories", {
            id: {
                primaryKey: true,
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true
            },
            userId: {
                allowNull: false,
                type: sequelize_1.DataTypes.INTEGER,
            },
            content: {
                allowNull: true,
                type: sequelize_1.DataTypes.TEXT
            },
            image: {
                allowNull: true,
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
        await queryInterface.addConstraint("stories", {
            type: "foreign key",
            fields: ['userId'],
            references: {
                table: "users",
                field: 'id'
            },
            onUpdate: "cascade",
            onDelete: "cascade"
        });
    },
    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable("stories");
    }
};
