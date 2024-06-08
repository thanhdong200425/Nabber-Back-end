"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("./sequelize"));
const sequelize_2 = require("sequelize");
class Post extends sequelize_2.Model {
    static async isExistLikeInSpecificPost(postId, userId) {
        try {
            const query = `SELECT COUNT(id) FROM likes WHERE "postId"=:postId AND "userId"=:userId`;
            const result = await sequelize_1.default.query(query, {
                replacements: {
                    postId: postId,
                    userId: userId,
                },
                type: sequelize_2.QueryTypes.SELECT,
            });
            const likeCount = parseInt(result[0].count, 10);
            return likeCount > 0;
        }
        catch (error) {
            console.log("Error in isExistLikeInSpecificPost function: " + error);
            return false;
        }
    }
    static async addALike(postId, userId) {
        try {
            const query = `INSERT INTO likes("postId", "userId") VALUES(:postId, :userId)`;
            const result = await sequelize_1.default.query(query, {
                replacements: {
                    postId: postId,
                    userId: userId,
                },
                type: sequelize_2.QueryTypes.INSERT,
            });
            return true;
        }
        catch (error) {
            console.log("Error in addALike function: " + error);
            return null;
        }
    }
    static async removeALike(postId, userId) {
        try {
            const query = `DELETE FROM likes WHERE "postId"=:postId AND "userId"=:userId`;
            const result = await sequelize_1.default.query(query, {
                replacements: {
                    postId: postId,
                    userId: userId,
                },
                type: sequelize_2.QueryTypes.DELETE,
            });
            return true;
        }
        catch (error) {
            console.log("Error in removeALike function: " + error);
            return null;
        }
    }
    static async getLikeInteractions(postId) {
        try {
            const query = `SELECT COUNT(id) FROM likes WHERE "postId"=:postId`;
            const result = await sequelize_1.default.query(query, {
                replacements: {
                    postId: postId,
                },
                type: sequelize_2.QueryTypes.SELECT,
            });
            // @ts-ignore
            return result[0].count;
        }
        catch (error) {
            console.log("Error in getLikeInteractions function: " + error);
        }
    }
}
Post.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_2.DataTypes.INTEGER,
    },
    userId: {
        allowNull: false,
        type: sequelize_2.DataTypes.INTEGER,
    },
    content: {
        allowNull: true,
        type: sequelize_2.DataTypes.TEXT,
    },
    image: {
        type: sequelize_2.DataTypes.TEXT,
        allowNull: true,
    },
    createdAt: {
        allowNull: false,
        type: sequelize_2.DataTypes.DATE,
        defaultValue: sequelize_2.DataTypes.NOW,
    },
    updatedAt: {
        allowNull: true,
        type: sequelize_2.DataTypes.DATE,
    },
}, {
    sequelize: sequelize_1.default,
    modelName: "post",
});
exports.default = Post;
