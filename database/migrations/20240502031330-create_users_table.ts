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
            phone_number: {
                allowNull: true,
                type: DataTypes.SMALLINT
            },
            password_hash: {
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
            given_name: {
                allowNull: true,
                type: DataTypes.TEXT
            },
            given_surname: {
                allowNull: true,
                type: DataTypes.TEXT
            },
            gender: {
                allowNull: true,
                type: DataTypes.SMALLINT,
                comment: "0: Male, 1: Female"
            },
            last_login: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updated_at: {
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
