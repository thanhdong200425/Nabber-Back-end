'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const helper_1 = require("../../helper/helper");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        const user = await User_1.default.findAll();
        // @ts-ignore
        const userArrayID = user.map(user => user.id), length = userArrayID.length;
        const data = [];
        for (let i = 0; i < 10; i++) {
            let sourceId = (0, helper_1.generateNumber)(1, length);
            let targetId;
            do {
                targetId = (0, helper_1.generateNumber)(1, length);
            } while (sourceId === targetId);
            data.push({
                createdAt: new Date(),
                sourceId: sourceId,
                status: Math.ceil(Math.random() * 3),
                targetId: targetId
            });
        }
        await queryInterface.bulkInsert('friends', data);
    },
    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('friends', {});
    }
};
