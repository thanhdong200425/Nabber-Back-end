'use strict';

import {DataTypes, QueryInterface, Sequelize} from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('users', 'coverImage', {
      type: DataTypes.TEXT,
      allowNull: true
    })

    await queryInterface.addColumn('users', 'username', {
      type: DataTypes.TEXT,
      allowNull: true
    })
  },

  async down (queryInterface: QueryInterface, Sequelize: Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('users', 'username');
    await queryInterface.removeColumn('users', 'coverImage');
  }
};
