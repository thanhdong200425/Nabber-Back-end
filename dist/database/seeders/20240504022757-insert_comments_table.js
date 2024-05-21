'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const Post_1 = __importDefault(require("../models/Post"));
const helper_1 = require("../../helper/helper");
const faker_1 = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const user = await User_1.default.findAll();
        const post = await Post_1.default.findAll();
        // @ts-ignore
        const lengthUsers = user.map(user => user.id).length;
        // @ts-ignore
        const lengthPosts = post.map(post => post.id).length;
        const data = [];
        for (let i = 0; i < 10; i++) {
            data.push({
                content: faker_1.faker.lorem.text(),
                createdAt: new Date(),
                postId: (0, helper_1.generateNumber)(1, lengthPosts),
                userId: (0, helper_1.generateNumber)(1, lengthUsers)
            });
        }
        await queryInterface.bulkInsert('comments', data);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('comments', {});
    }
};
