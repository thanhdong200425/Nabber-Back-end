import sequelize from "./sequelize";
import {DataTypes} from "sequelize";

export type story = {
    id?: number,
    userId: number,
    content: string,
    image: string,
    createdAt: Date,
    updatedAt: Date
}

const Story = sequelize.define("story", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    content: {
        allowNull: true,
        type: DataTypes.TEXT
    },
    image: {
        allowNull: true,
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

export default Story;