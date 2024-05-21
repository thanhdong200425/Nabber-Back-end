"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("./sequelize");
var sequelize_2 = require("sequelize");
var Post = sequelize_1.default.define("post", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_2.DataTypes.INTEGER,
    },
    userId: {
        allowNull: false,
        type: sequelize_2.DataTypes.INTEGER,
    },
    content: {
        allowNull: true,
        type: sequelize_2.DataTypes.TEXT,
    },
    image: {
        type: sequelize_2.DataTypes.TEXT,
        allowNull: true,
    },
    createdAt: {
        allowNull: false,
        type: sequelize_2.DataTypes.DATE,
        defaultValue: sequelize_2.DataTypes.NOW,
    },
    updatedAt: {
        allowNull: true,
        type: sequelize_2.DataTypes.DATE,
    },
});
exports.default = Post;
