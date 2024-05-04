'use strict';

import {QueryInterface, Sequelize} from "sequelize";
import User from "../models/User";
import {message} from "../models/Message";
import {faker} from "@faker-js/faker";
import {generateNumber} from "../../helper/helper";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        const user = await User.findAll();
        // @ts-ignore
        const userIdArray = user.map(user => user.id).length;
        const data: message[] = [];
        for (let i = 0; i < 10; i++) {
            data.push({
                createdAt: new Date(),
                message: faker.lorem.sentence(),
                sendStatus: generateNumber(1, 3),
                sourceId: generateNumber(1, userIdArray),
                targetId: generateNumber(1, userIdArray),
            })
        }

        await queryInterface.bulkInsert('messages', data);
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.bulkDelete('messages', {});
    }
};
