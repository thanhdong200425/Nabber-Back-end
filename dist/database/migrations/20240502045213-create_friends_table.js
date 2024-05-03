'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Add altering commands here.
             *
             * Example:
             * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
             */
            yield queryInterface.createTable("friends", {
                id: {
                    primaryKey: true,
                    autoIncrement: true,
                    type: sequelize_1.DataTypes.INTEGER
                },
                source_id: {
                    allowNull: false,
                    type: sequelize_1.DataTypes.INTEGER
                },
                target_id: {
                    allowNull: false,
                    type: sequelize_1.DataTypes.INTEGER
                },
                status: {
                    allowNull: false,
                    type: sequelize_1.DataTypes.SMALLINT,
                    comment: "0: Waiting, 1: Accepted, 2: Canceled"
                },
                created_at: {
                    allowNull: false,
                    type: sequelize_1.DataTypes.DATE,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
                }
            });
            yield queryInterface.addConstraint('friends', {
                fields: ['source_id'],
                type: "foreign key",
                references: {
                    table: "users",
                    field: "id"
                },
                onDelete: "cascade",
                onUpdate: "cascade"
            });
            yield queryInterface.addConstraint('friends', {
                fields: ['target_id'],
                type: "foreign key",
                references: {
                    table: "users",
                    field: "id"
                },
                onDelete: "cascade",
                onUpdate: "cascade"
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Add reverting commands here.
             *
             * Example:
             * await queryInterface.dropTable('users');
             */
            yield queryInterface.dropTable("friends");
        });
    }
};
