'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room_facility extends Model {
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
  room_facility.init({
    room_facility_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    room_facility_name: DataTypes.STRING,
    room_facility_description: DataTypes.STRING,
    room_type_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'room_facility',
    tableName: 'room_facility'
  });
  return room_facility;
};