"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const helper_1 = require("../../helper/helper");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        let data = [];
        for (let i = 0; i < 10; i++) {
            let randomEmail = faker_1.faker.internet.email(), randomPhoneNumber = (0, helper_1.generateNumber)(8, 9), password = 123, address = faker_1.faker.location.streetAddress(), dob = faker_1.faker.date.birthdate(), country = faker_1.faker.location.country(), givenName = faker_1.faker.person.lastName(), givenSurName = faker_1.faker.person.firstName(), gender = Math.floor(Math.random() * 2), lastLogin = new Date(), createdAt = new Date(), updatedAt = new Date(), image = faker_1.faker.image.avatarGitHub(), username = "@" + givenName.toLowerCase(), coverImage = faker_1.faker.image.urlPicsumPhotos(), 
            // @ts-ignore
            token = jsonwebtoken_1.default.sign({ email: randomEmail }, process.env.ENV_SECRET_KEY, { expiresIn: "30 days" });
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
                username: username,
                coverImage: coverImage,
                loginToken: token,
            });
        }
        return queryInterface.bulkInsert("users", data);
    },
    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("users", {});
    },
};
