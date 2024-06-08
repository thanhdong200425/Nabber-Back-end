"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const Post_1 = __importDefault(require("../models/Post"));
const helper_1 = require("../../helper/helper");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const user = await User_1.default.findAll();
        const post = await Post_1.default.findAll();
        // @ts-ignore
        const userIdArray = user.map((user) => user.id).length;
        // @ts-ignore
        const postIdArray = post.map((post) => post.id).length;
        let data = [];
        for (let i = 0; i < 10; i++) {
            data.push({
                postId: (0, helper_1.generateNumber)(1, postIdArray),
                userId: (0, helper_1.generateNumber)(1, userIdArray),
                createdAt: new Date(),
            });
        }
        try {
            await queryInterface.bulkInsert("likes", data);
        }
        catch (e) {
            data = [];
            for (let i = 0; i < 10; i++) {
                data.push({
                    postId: (0, helper_1.generateNumber)(1, postIdArray),
                    userId: (0, helper_1.generateNumber)(1, userIdArray),
                    createdAt: new Date(),
                });
            }
            await queryInterface.bulkInsert("likes", data);
        }
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("likes", {});
    },
};
