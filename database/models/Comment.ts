import sequelize from "./sequelize";
import {DataTypes} from "sequelize";

export type comment = {
    id?: number,
    userId: number,
    postId: number,
    content: string,
    createdAt: Date
}

const Comment = sequelize.define("comment", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    postId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
})

export default Comment;