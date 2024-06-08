"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./sequelize"));
const bcrypt = __importStar(require("bcrypt"));
class User extends sequelize_1.Model {
    static async authenticate(email, password) {
        const query = 'SELECT email, "passwordHash" FROM users WHERE email=:email';
        try {
            const validUser = await sequelize_2.default.query(query, {
                replacements: { email: email },
                type: sequelize_1.QueryTypes.SELECT,
            });
            if (validUser.length > 0) {
                const user = validUser[0];
                // @ts-ignore
                const { email, passwordHash } = user;
                // @ts-ignore
                const isMatch = await bcrypt.compare(password, passwordHash);
                if (isMatch)
                    return user;
                else
                    return false;
            }
        }
        catch (error) {
            console.log(error);
        }
        return null;
    }
    static async getId(email, password = "") {
        const query = "SELECT id from users where email=:email";
        try {
            const validUser = await sequelize_2.default.query(query, {
                replacements: { email: email },
                type: sequelize_1.QueryTypes.SELECT,
            });
            if (validUser.length > 0)
                return validUser[0];
            return null;
        }
        catch (error) {
            console.log("Error when get ID of user: " + error);
        }
    }
    static async getPostOfFriends(userId) {
        const query = 'SELECT posts.*, users."givenName", users."givenSurname", users.image as "userImage", users.country, COUNT(likes.id) as "likeCount" FROM posts JOIN friends ON posts."userId" = friends."targetId" JOIN users ON users.id = posts."userId" LEFT JOIN likes ON likes."postId" = posts.id WHERE friends."sourceId"=:id GROUP BY posts.id, users."givenName", users."givenSurname", users.image, users.country';
        try {
            const listUser = await sequelize_2.default.query(query, {
                replacements: { id: userId },
                type: sequelize_1.QueryTypes.SELECT,
            });
            return listUser.length <= 0 ? null : listUser;
        }
        catch (error) {
            console.log("Error when get posts of friend: " + error);
        }
    }
    static async addPost(userId, image, content) {
        const query = 'INSERT INTO posts("userId", content, image) VALUES(:userId, :content, :image)';
        try {
            const result = await sequelize_2.default.query(query, {
                replacements: {
                    userId: userId,
                    content: content,
                    image: image,
                },
                type: sequelize_1.QueryTypes.INSERT,
            });
            // @ts-ignore
            return result.length <= 0 ? false : true;
        }
        catch (error) {
            console.log("Error when add post for the user:  " + error);
        }
    }
    static async getAllPost(userId) {
        const query = 'SELECT posts.*, users."givenName", users."givenSurname", users.image as "userImage", users.country, COUNT(likes.id) as "likeCount" FROM posts JOIN users ON users.id = posts."userId" LEFT JOIN likes ON likes."postId" = posts.id WHERE users.id =:id GROUP BY posts.id, users."givenName", users."givenSurname", users.image, users.country';
        try {
            const listPostOfUser = await sequelize_2.default.query(query, {
                replacements: { id: userId },
                type: sequelize_1.QueryTypes.SELECT,
            });
            return listPostOfUser.length <= 0 ? null : listPostOfUser;
        }
        catch (error) {
            console.log("Error when get the list of post for current user: " + error);
            return null;
        }
    }
    static async findContacts(value) { }
}
User.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    email: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    phoneNumber: {
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    passwordHash: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT,
    },
    address: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT,
    },
    dob: {
        allowNull: true,
        type: sequelize_1.DataTypes.DATE,
    },
    country: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
    givenName: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT,
    },
    givenSurname: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT,
    },
    gender: {
        allowNull: true,
        type: sequelize_1.DataTypes.SMALLINT,
        comment: "0: Male, 1: Female",
    },
    lastLogin: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    image: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    coverImage: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    username: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    loginToken: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    modelName: "user",
});
exports.default = User;
