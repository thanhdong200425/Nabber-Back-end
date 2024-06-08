import sequelize from "./sequelize";
import { DataTypes, Model, QueryTypes } from "sequelize";

export type post = {
    id?: number;
    userId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    image?: string;
};

class Post extends Model {
    public static async isExistLikeInSpecificPost(postId: number, userId: number) {
        try {
            const query = `SELECT COUNT(id) FROM likes WHERE "postId"=:postId AND "userId"=:userId`;
            const result = await sequelize.query(query, {
                replacements: {
                    postId: postId,
                    userId: userId,
                },
                type: QueryTypes.SELECT,
            });
            const likeCount = parseInt((result[0] as any).count, 10);
            return likeCount > 0;
        } catch (error) {
            console.log("Error in isExistLikeInSpecificPost function: " + error);
            return false;
        }
    }

    public static async addALike(postId: number, userId: number) {
        try {
            const query = `INSERT INTO likes("postId", "userId") VALUES(:postId, :userId)`;
            const result = await sequelize.query(query, {
                replacements: {
                    postId: postId,
                    userId: userId,
                },
                type: QueryTypes.INSERT,
            });
            return true;
        } catch (error) {
            console.log("Error in addALike function: " + error);
            return null;
        }
    }

    public static async removeALike(postId: number, userId: number) {
        try {
            const query = `DELETE FROM likes WHERE "postId"=:postId AND "userId"=:userId`;
            const result = await sequelize.query(query, {
                replacements: {
                    postId: postId,
                    userId: userId,
                },
                type: QueryTypes.DELETE,
            });
            return true;
        } catch (error) {
            console.log("Error in removeALike function: " + error);
            return null;
        }
    }

    public static async getLikeInteractions(postId: number) {
        try {
            const query = `SELECT COUNT(id) FROM likes WHERE "postId"=:postId`;
            const result = await sequelize.query(query, {
                replacements: {
                    postId: postId,
                },
                type: QueryTypes.SELECT,
            });
            // @ts-ignore
            return result[0].count;
        } catch (error) {
            console.log("Error in getLikeInteractions function: " + error);
        }
    }
}

Post.init(
    {
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
    },
    {
        sequelize,
        modelName: "post",
    }
);

export default Post;
