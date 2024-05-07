import {DataTypes, Model, QueryTypes} from "sequelize";
import sequelize from "./sequelize";
import {hashPassword} from "../../helper/helper";
import bcrypt, {compare} from "bcrypt";

export type user = {
    id?: number;
    email: string;
    phoneNumber: number;
    passwordHash: number;
    address: string;
    dob: any;
    country: string;
    givenName: string;
    givenSurname: string;
    gender: number;
    lastLogin: Date;
    createdAt: Date;
    updatedAt: Date;
    image: String;
};

class User extends Model {
    public static async authenticate(email: String, password: String) {
        const query = 'SELECT email, "passwordHash" FROM users WHERE email=:email';
        try {
            const validUser = await sequelize.query(query, {
                replacements: {email: email},
                type: QueryTypes.SELECT,
            });
            if (validUser.length > 0) {
                const user = validUser[0];
                // @ts-ignore
                const {email, passwordHash} = user;
                // @ts-ignore
                const isMatch = await bcrypt.compare(password, passwordHash);
                if (isMatch) return user;
                else return false;
            }
        } catch (error: any) {
            console.log(error);
        }
        return null;
    }
}

User.init(
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        phoneNumber: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        passwordHash: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        address: {
            allowNull: true,
            type: DataTypes.TEXT,
        },
        dob: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        country: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        givenName: {
            allowNull: true,
            type: DataTypes.TEXT,
        },
        givenSurname: {
            allowNull: true,
            type: DataTypes.TEXT,
        },
        gender: {
            allowNull: true,
            type: DataTypes.SMALLINT,
            comment: "0: Male, 1: Female",
        },
        lastLogin: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "user",
    }
);

export default User;
