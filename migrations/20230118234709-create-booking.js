'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('booking', {
      booking_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      booking_number: {
        type: Sequelize.INTEGER
      },
      booking_name: {
        type: Sequelize.STRING
      },
      booking_email: {
        type: Sequelize.STRING
      },
      booking_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      booking_check_in_date: {
        type: Sequelize.DATE
      },
      booking_check_out_date: {
        type: Sequelize.DATE
      },
      booking_guest_name: {
        type: Sequelize.STRING
      },
      booking_number_of_rooms: {
        type: Sequelize.INTEGER
      },
      room_type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "room_type",
          key: "room_type_id"
        }
      },
      booking_status: {
        type: Sequelize.ENUM,
        values: ['new', 'check_in', 'check_out']
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "user",
          key: "user_id"
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
    await queryInterface.dropTable('booking');
  }
};