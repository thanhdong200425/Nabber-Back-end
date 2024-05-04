'use strict';

import {QueryInterface, Sequelize} from "sequelize";
import User from "../models/User";
import {friend} from "../models/Friend";
import {generateNumber} from "../../helper/helper";

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
        const userArrayID = user.map(user => user.id),
            length = userArrayID.length;
        const data: friend[] = [];
        for (let i = 0; i < 10; i++) {
            let sourceId = generateNumber(1, length)
            let targetId: number
            do {
                targetId = generateNumber(1, length);
            } while (sourceId === targetId);
            data.push({
                createdAt: new Date(),
                id: i,
                sourceId: sourceId,
                status: Math.floor(Math.random() * 3),
                targetId: targetId
            })
        }

        await queryInterface.bulkInsert('friends', data);
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('friends', {});
    }
};
