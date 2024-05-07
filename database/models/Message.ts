import sequelize from "./sequelize";
import {DataTypes} from "sequelize";

export type message = {
    id?: number,
    sourceId: number,
    targetId: number,
    sendStatus: number,
    message: string,
    createdAt: Date,
    updatedAt?: Date
}

const Message = sequelize.define("message", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    sourceId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    targetId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    sendStatus: {
        allowNull: false,
        type: DataTypes.SMALLINT,
        comment: "0: Waiting, 1: Accepted, 2: Unsent"
    },
    message: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        allowNull: true,
        type: DataTypes.DATE
    }
})

export default Message;