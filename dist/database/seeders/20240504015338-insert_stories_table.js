'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const faker_1 = require("@faker-js/faker");
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
        const userIdArray = user.map(user => user.id), length = userIdArray.length;
        const data = [];
        for (let i = 0; i < 10; i++) {
            data.push({
                userId: Math.floor(Math.random() * length + 1),
                content: faker_1.faker.lorem.text(),
                image: faker_1.faker.image.urlPicsumPhotos(),
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }
        await queryInterface.bulkInsert('stories', data);
    },
    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('stories', {});
    }
};
