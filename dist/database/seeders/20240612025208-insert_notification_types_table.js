"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const typesOfAction = ["like", "comment", "share"];
        let data = [];
        for (let i = 0; i < 3; i++) {
            data.push({
                name: typesOfAction[i],
            });
        }
        await queryInterface.bulkInsert("notification_types", data);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("notification_types", {});
    },
};
