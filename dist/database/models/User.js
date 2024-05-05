"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./sequelize"));
class User extends sequelize_1.Model {
    static authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT email, "passwordHash" FROM users WHERE email=:email AND "passwordHash"=:passwordHash';
            try {
                const validUser = yield sequelize_2.default.query(query, {
                    replacements: { email: email, passwordHash: password },
                    type: sequelize_1.QueryTypes.SELECT,
                });
                if (validUser)
                    return validUser[0];
            }
            catch (error) {
                console.log(error);
            }
            return null;
        });
    }
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
}, {
    sequelize: sequelize_2.default,
    modelName: "user",
});
exports.default = User;
