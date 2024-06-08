"use strict";

import { QueryInterface, Sequelize } from "sequelize";
import User from "../models/User";
import Post from "../models/Post";
import { generateNumber } from "../../helper/helper";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        const user = await User.findAll();
        const post = await Post.findAll();
        // @ts-ignore
        const userIdArray = user.map((user) => user.id).length;

        // @ts-ignore
        const postIdArray = post.map((post) => post.id).length;
        let data = [];
        for (let i = 0; i < 10; i++) {
            data.push({
                postId: generateNumber(1, postIdArray),
                userId: generateNumber(1, userIdArray),
                createdAt: new Date(),
            });
        }

        try {
            await queryInterface.bulkInsert("likes", data);
        } catch (e) {
            data = [];
            for (let i = 0; i < 10; i++) {
                data.push({
                    postId: generateNumber(1, postIdArray),
                    userId: generateNumber(1, userIdArray),
                    createdAt: new Date(),
                });
            }
            await queryInterface.bulkInsert("likes", data);
        }
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.bulkDelete("likes", {});
    },
};
