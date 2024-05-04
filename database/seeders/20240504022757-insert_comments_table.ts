'use strict';

import {QueryInterface, Sequelize} from "sequelize";
import User from "../models/User";
import Post from "../models/Post";
import {comment} from "../models/Comment";
import {generateNumber} from "../../helper/helper";
import {faker} from "@faker-js/faker";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        const user = await User.findAll();
        const post = await Post.findAll();

        // @ts-ignore
        const lengthUsers = user.map(user => user.id).length;
        // @ts-ignore
        const lengthPosts = post.map(post => post.id).length;

        const data: comment[] = [];
        for (let i = 0; i < 10; i++) {
            data.push({
                content: faker.lorem.text(),
                createdAt: new Date(),
                id: i,
                postId: generateNumber(1, lengthPosts),
                userId: generateNumber(1, lengthUsers)
            })
        }

        await queryInterface.bulkInsert('comments', data);
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.bulkDelete('comments', {});
    }
};
