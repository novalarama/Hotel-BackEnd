'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.room_photo, {
        foreignKey: "room_type_id",
        as: "room_photo"
      })

      this.hasMany(models.booking, {
        foreignKey: "room_type_id",
        as: "booking"
      })

      this.hasMany(models.room, {
        foreignKey: "room_type_id",
        as: "room"
      })
    }
  }
  room_type.init({
    room_type_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    room_type_name: DataTypes.STRING,
    room_type_price: DataTypes.INTEGER,
    room_type_description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'room_type',
    tableName: 'room_type'
  });
  return room_type;
};