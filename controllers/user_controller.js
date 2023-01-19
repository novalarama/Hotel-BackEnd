const userModel = require("../models/index").user;

const path = require(`path`);
const fs = require(`fs`);

// import sequelize operator
const sequelize = require(`sequelize`);
const operator = sequelize.Op;

exports.getDataUser = (request, response) => {
  userModel
    .findAll()
    .then((result) => {
      return response.json({ count: result.length, data: result });
    })
    .catch((error) => {
      return response.json({ message: error });
    });
};
