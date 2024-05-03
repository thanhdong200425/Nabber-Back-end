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
            yield queryInterface.createTable('comments', {
                id: {
                    primaryKey: true,
                    type: sequelize_1.DataTypes.INTEGER,
                    autoIncrement: true
                },
                user_id: {
                    allowNull: false,
                    type: sequelize_1.DataTypes.INTEGER
                },
                post_id: {
                    allowNull: false,
                    type: sequelize_1.DataTypes.INTEGER
                },
                content: {
                    type: sequelize_1.DataTypes.TEXT,
                    allowNull: false,
                },
                created_at: {
                    type: sequelize_1.DataTypes.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
                },
                updated_at: {
                    type: sequelize_1.DataTypes.DATE,
                    allowNull: true
                }
            });
            yield queryInterface.addConstraint("comments", {
                fields: ['user_id'],
                type: "foreign key",
                references: {
                    table: "users",
                    field: "id"
                },
                onDelete: "cascade",
                onUpdate: "cascade"
            });
            yield queryInterface.addConstraint("comments", {
                fields: ['post_id'],
                type: "foreign key",
                references: {
                    table: "posts",
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
            yield queryInterface.dropTable("comments");
        });
    }
};
