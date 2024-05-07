'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findAll();
            const post = yield Post_1.default.findAll();
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
            yield queryInterface.bulkInsert('comments', data);
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete('comments', {});
        });
    }
};
