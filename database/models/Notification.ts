import { Model, DataTypes, Sequelize, QueryTypes } from "sequelize";
import sequelize from "./sequelize";

class Notification extends Model {
    public static async getAll(receiverId: number) {
        try {
            const query = `SELECT notifications.*, users.username, users.image as "userImage" FROM notifications JOIN users ON users.id = notifications."senderId" JOIN posts ON posts.id = notifications."postId" WHERE notifications."receiverId"=:receiverId`;
            const result = await sequelize.query(query, {
                replacements: {
                    receiverId: receiverId,
                },
                type: QueryTypes.SELECT,
            });

            return result;
        } catch (error) {
            console.log("Error in getAll function: " + error);
        }
    }
}

Notification.init(
    {
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
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    },
    {
        sequelize,
        modelName: "notification",
    }
);

export default Notification;
