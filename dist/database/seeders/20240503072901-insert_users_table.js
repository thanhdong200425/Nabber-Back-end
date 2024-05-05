"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const helper_1 = require("../../helper/helper");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = [];
            for (let i = 0; i < 10; i++) {
                let randomEmail = faker_1.faker.internet.email(), randomPhoneNumber = (0, helper_1.generateNumber)(8, 9), password = 123, address = faker_1.faker.location.streetAddress(), dob = faker_1.faker.date.birthdate(), country = faker_1.faker.location.country(), givenName = faker_1.faker.person.lastName(), givenSurName = faker_1.faker.person.firstName(), gender = Math.floor(Math.random() * 2), lastLogin = new Date(), createdAt = new Date(), updatedAt = new Date(), image = faker_1.faker.image.avatarGitHub();
                data.push({
                    email: randomEmail,
                    phoneNumber: randomPhoneNumber,
                    passwordHash: password,
                    address: address,
                    dob: dob,
                    country: country,
                    givenName: givenName,
                    givenSurname: givenSurName,
                    gender: gender,
                    lastLogin: lastLogin,
                    createdAt: createdAt,
                    updatedAt: updatedAt,
                    image: image,
                });
            }
            return queryInterface.bulkInsert("users", data);
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
            yield queryInterface.bulkDelete("users", {});
        });
    },
};