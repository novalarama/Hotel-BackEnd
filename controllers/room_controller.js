const roomModel = require("../models/index").room;

const path = require(`path`);
const fs = require(`fs`);

// import sequelize operator
const sequelize = require(`sequelize`);
const operator = sequelize.Op;

exports.getDataRoom = (request, response) => {
  roomModel
    .findAll()
    .then((result) => {
      return response.json({ count: result.length, data: result });
    })
    .catch((error) => {
      return response.json({ message: error });
    });
};
