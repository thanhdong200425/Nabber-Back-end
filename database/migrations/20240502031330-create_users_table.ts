'use strict';

// @ts-ignore
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
        await queryInterface.createTable("users", {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING
            },
            phoneNumber: {
                allowNull: true,
                type: DataTypes.INTEGER
            },
            passwordHash: {
                allowNull: false,
                type: DataTypes.TEXT
            },
            address: {
                allowNull: true,
                type: DataTypes.TEXT
            },
            dob: {
                allowNull: false,
                type: DataTypes.DATE
            },
            country: {
                allowNull: true,
                type: DataTypes.STRING
            },
            givenName: {
                allowNull: true,
                type: DataTypes.TEXT
            },
            givenSurname: {
                allowNull: true,
                type: DataTypes.TEXT
            },
            gender: {
                allowNull: true,
                type: DataTypes.INTEGER,
                comment: "0: Male, 1: Female"
            },
            lastLogin: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true
            }
        })
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable("users")
    }
};
