'use strict';

import {QueryInterface, Sequelize} from "sequelize";
import {user} from "../models/User";
import {faker} from "@faker-js/faker";
import {generateNumber} from "../../helper/helper";


/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        let data: user[] = []
        for (let i = 0; i < 10; i++) {
            let randomEmail = faker.internet.email(),
                randomPhoneNumber = generateNumber(8, 9),
                password = 123,
                address = faker.location.streetAddress(),
                dob = faker.date.birthdate(),
                country = faker.location.country(),
                givenName = faker.person.lastName(),
                givenSurName = faker.person.firstName(),
                gender = Math.floor(Math.random() * 2),
                lastLogin = new Date(),
                createdAt = new Date(),
                updatedAt = new Date(),
                image = faker.image.avatarGitHub();

            data.push({
                id: i,
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
                image: image
            });
        }

        return queryInterface.bulkInsert('users', data);
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('users', {});
    }
};
