"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./sequelize"));
class Notification extends sequelize_1.Model {
    static async getAll(receiverId) {
        try {
            const query = `SELECT notifications.*, users.username, users.image as "userImage" FROM notifications JOIN users ON users.id = notifications."senderId" JOIN posts ON posts.id = notifications."postId" WHERE notifications."receiverId"=:receiverId`;
            const result = await sequelize_2.default.query(query, {
                replacements: {
                    receiverId: receiverId,
                },
                type: sequelize_1.QueryTypes.SELECT,
            });
            return result;
        }
        catch (error) {
            console.log("Error in getAll function: " + error);
        }
    }
}
Notification.init({
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
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize: sequelize_2.default,
    modelName: "notification",
});
exports.default = Notification;
