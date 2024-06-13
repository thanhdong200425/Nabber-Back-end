import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";

class NotificationType extends Model {}

NotificationType.init(
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "notificationType",
    }
);
