'use strict';

import {QueryInterface, Sequelize} from "sequelize";
import User from "../models/User";
import {story} from "../models/Story";
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
            length = userIdArray.length;
        const data: story[] = [];
        for (let i = 0; i < 10; i++) {
            data.push({
                id: i,
                userId: Math.floor(Math.random() * length),
                content: faker.lorem.text(),
                image: faker.image.urlPicsumPhotos(),
                createdAt: new Date(),
                updatedAt: new Date()
            })
        }

        await queryInterface.bulkInsert('stories', data);
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('stories', {});
    }
};
