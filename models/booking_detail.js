'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.booking, {
        foreignKey: "booking_id",
        as: "booking"
      })

      this.belongsTo(models.room, {
        foreignKey: "room_id",
        as: "room"
      })
    }
  }
  booking_detail.init({
    booking_detail_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    booking_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    access_date: DataTypes.DATE,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'booking_detail',
    tableName: 'booking_detail'
  });

  return booking_detail;
};