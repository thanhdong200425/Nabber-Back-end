import {DataTypes} from "sequelize";
import sequelize from "./sequelize";


export type user = {
    id: number,
    email: string,
    phoneNumber: number,
    passwordHash: number,
    address: string,
    dob: any,
    country: string,
    givenName: string
    givenSurname: string,
    gender: number,
    lastLogin: Date,
    createdAt: Date,
    updatedAt: Date,
    image: String
}

const User = sequelize.define('user', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING
    },
    phoneNumber: {
        allowNull: true,
        type: DataTypes.SMALLINT
    },
    passwordHash: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    address: {
        allowNull: true,
        type: DataTypes.TEXT
    },
    dob: {
        allowNull: false,
        type: DataTypes.DATE
    },
    country: {
        allowNull: true,
        type: DataTypes.STRING
    },
    givenName: {
        allowNull: true,
        type: DataTypes.TEXT
    },
    givenSurname: {
        allowNull: true,
        type: DataTypes.TEXT
    },
    gender: {
        allowNull: true,
        type: DataTypes.SMALLINT,
        comment: "0: Male, 1: Female"
    },
    lastLogin: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true
    }
})

export default User;