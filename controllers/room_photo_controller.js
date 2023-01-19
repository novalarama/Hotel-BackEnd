const roomPhotoModel = require("../models/index").room_photo;

const path = require(`path`);
const fs = require(`fs`);

// import sequelize operator
const sequelize = require(`sequelize`);
const operator = sequelize.Op;

exports.getDataRoomPhoto = (request, response) => {
  roomPhotoModel
    .findAll()
    .then((result) => {
      return response.json({ count: result.length, data: result });
    })
    .catch((error) => {
      return response.json({ message: error });
    });
};
