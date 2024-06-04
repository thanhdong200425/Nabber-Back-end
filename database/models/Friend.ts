import sequelize from "./sequelize";
import { DataTypes } from "sequelize";

export type friend = {
    id?: number;
    sourceId: number;
    targetId: number;
    status: number;
    createdAt: Date;
};

const Friend = sequelize.define("friend", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    sourceId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    targetId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    status: {
        allowNull: false,
        type: DataTypes.SMALLINT,
        comment: "0: Waiting, 1: Accepted, 2: Canceled",
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

export default Friend;
