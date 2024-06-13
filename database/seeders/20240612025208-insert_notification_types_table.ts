"use strict";

import { QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        const typesOfAction = ["like", "comment", "share"];
        let data = [];
        for (let i = 0; i < 3; i++) {
            data.push({
                name: typesOfAction[i],
            });
        }

        await queryInterface.bulkInsert("notification_types", data);
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.bulkDelete("notification_types", {});
    },
};
