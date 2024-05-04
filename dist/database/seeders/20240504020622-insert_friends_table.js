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
const helper_1 = require("../../helper/helper");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Add seed commands here.
             *
             * Example:
             * await queryInterface.bulkInsert('People', [{
             *   name: 'John Doe',
             *   isBetaMember: false
             * }], {});
             */
            const user = yield User_1.default.findAll();
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
                    id: i,
                    sourceId: sourceId,
                    status: Math.floor(Math.random() * 3),
                    targetId: targetId
                });
            }
            yield queryInterface.bulkInsert('friends', data);
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Add commands to revert seed here.
             *
             * Example:
             * await queryInterface.bulkDelete('People', null, {});
             */
            yield queryInterface.bulkDelete('friends', {});
        });
    }
};
