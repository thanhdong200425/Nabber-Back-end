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
const faker_1 = require("@faker-js/faker");
const helper_1 = require("../../helper/helper");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findAll();
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
            yield queryInterface.bulkInsert('messages', data);
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete('messages', {});
        });
    }
};
