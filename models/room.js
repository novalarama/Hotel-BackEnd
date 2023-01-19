'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.room_type, {
        foreignKey: "room_type_id",
        as: "room_type"
      })

      this.hasMany(models.booking_detail, {
        foreignKey: "room_id",
        as: "booking_detail"
      })
    }
  }
  room.init({
    room_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    room_number: DataTypes.STRING,
    room_type_id: DataTypes.INTEGER,
    room_is_available: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'room',
    tableName: 'room'
  });
  return room;
};