'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const faker_1 = require("@faker-js/faker");
const helper_1 = require("../../helper/helper");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const user = await User_1.default.findAll();
        // @ts-ignore
        const userIdArray = user.map(user => user.id).length;
        const data = [];
        for (let i = 0; i < 10; i++) {
            data.push({
                createdAt: new Date(),
                message: faker_1.faker.lorem.sentence(),
                sendStatus: (0, helper_1.generateNumber)(1, 3),
                sourceId: (0, helper_1.generateNumber)(1, userIdArray),
                targetId: (0, helper_1.generateNumber)(1, userIdArray),
            });
        }
        await queryInterface.bulkInsert('messages', data);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('messages', {});
    }
};
