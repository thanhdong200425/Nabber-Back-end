import sequelize from "./sequelize";
import { DataTypes } from "sequelize";

export type post = {
    id?: number;
    userId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    image?: string;
};

const Post = sequelize.define("post", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    content: {
        allowNull: true,
        type: DataTypes.TEXT,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
    },
});

export default Post;
