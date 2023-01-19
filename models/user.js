'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.booking, {
        foreignKey: "user_id",
        as: "booking"
      })
    }
  }
  user.init({
    user_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_name: DataTypes.STRING,
    user_photo: DataTypes.STRING,
    user_email: DataTypes.STRING,
    user_password: DataTypes.STRING,
    user_role: DataTypes.ENUM('admin','receptionist')
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'user'
  });
  return user;
};