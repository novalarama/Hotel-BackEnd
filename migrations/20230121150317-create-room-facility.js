'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('room_facility', {
      room_facility_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      room_facility_name: {
        type: Sequelize.STRING
      },
      room_facility_description: {
        type: Sequelize.STRING
      },
      room_type_id: {
        type: Sequelize.INTEGER,
        referense: {
          model: "room_type",
          key: "room_type_id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('room_facility');
  }
};