'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room_photo extends Model {
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
    }
  }
  room_photo.init({
    room_photo_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    room_photo_path: DataTypes.STRING,
    room_type_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'room_photo',
    tableName: 'room_photo'
  });
  return room_photo;
};