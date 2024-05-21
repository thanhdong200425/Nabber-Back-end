"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelize_2 = require("./sequelize");
var bcrypt = require("bcrypt");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.authenticate = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var query, validUser, user, email_1, passwordHash, isMatch, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = 'SELECT email, "passwordHash" FROM users WHERE email=:email';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, sequelize_2.default.query(query, {
                                replacements: { email: email },
                                type: sequelize_1.QueryTypes.SELECT,
                            })];
                    case 2:
                        validUser = _a.sent();
                        if (!(validUser.length > 0)) return [3 /*break*/, 4];
                        user = validUser[0];
                        email_1 = user.email, passwordHash = user.passwordHash;
                        return [4 /*yield*/, bcrypt.compare(password, passwordHash)];
                    case 3:
                        isMatch = _a.sent();
                        if (isMatch)
                            return [2 /*return*/, user];
                        else
                            return [2 /*return*/, false];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, null];
                }
            });
        });
    };
    User.getId = function (email_2) {
        return __awaiter(this, arguments, void 0, function (email, password) {
            var query, validUser, error_2;
            if (password === void 0) { password = ""; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "SELECT id from users where email=:email";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, sequelize_2.default.query(query, {
                                replacements: { email: email },
                                type: sequelize_1.QueryTypes.SELECT,
                            })];
                    case 2:
                        validUser = _a.sent();
                        if (validUser.length > 0)
                            return [2 /*return*/, validUser[0]];
                        return [2 /*return*/, null];
                    case 3:
                        error_2 = _a.sent();
                        console.log("Error when get ID of user: " + error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    User.getPostOfFriends = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, listUser, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = 'SELECT posts.*, users."givenName", users."givenSurname", users.image as "userImage", users.country FROM posts JOIN friends ON posts."userId" = friends."targetId" JOIN users ON users.id = posts."userId" WHERE friends."sourceId"=:id';
                        console.log(userId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, sequelize_2.default.query(query, {
                                replacements: { id: userId },
                                type: sequelize_1.QueryTypes.SELECT,
                            })];
                    case 2:
                        listUser = _a.sent();
                        return [2 /*return*/, listUser.length <= 0 ? null : listUser];
                    case 3:
                        error_3 = _a.sent();
                        console.log("Error when get posts of friend: " + error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    User.addPost = function (userId, image, content) {
        return __awaiter(this, void 0, void 0, function () {
            var query, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = 'INSERT INTO posts("userId", content, image) VALUES(:userId, :content, :image)';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, sequelize_2.default.query(query, {
                                replacements: { userId: userId, content: content, image: image },
                                type: sequelize_1.QueryTypes.INSERT,
                            })];
                    case 2:
                        result = _a.sent();
                        // @ts-ignore
                        return [2 /*return*/, result.length <= 0 ? false : true];
                    case 3:
                        error_4 = _a.sent();
                        console.log("Error when add post for the user:  " + error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return User;
}(sequelize_1.Model));
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
