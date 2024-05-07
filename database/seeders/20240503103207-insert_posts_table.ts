'use strict';

import {QueryInterface, Sequelize} from "sequelize";
import User from "../models/User";
import {post} from "../models/Post";
import {faker} from "@faker-js/faker";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        const user = await User.findAll();
        // @ts-ignore
        const userIdArray = user.map(user => user.id),
            lengthArray = userIdArray.length;

        let data: post[] = [];
        for (let i = 0; i < 10; i++) {
            data.push({
                userId: Math.floor(Math.random() * lengthArray + 1),
                content: faker.lorem.text(),
                createdAt: new Date(),
                updatedAt: new Date()
            })
        }

        await queryInterface.bulkInsert('posts', data);
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('posts', {});
    }
};
