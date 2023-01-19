const bookingDetailModel = require("../models/index").booking_detail;

const path = require(`path`);
const fs = require(`fs`);

// import sequelize operator
const sequelize = require(`sequelize`);
const operator = sequelize.Op;

exports.getDataBookingDetail = (request, response) => {
  bookingDetailModel
    .findAll()
    .then((result) => {
      return response.json({ count: result.length, data: result });
    })
    .catch((error) => {
      return response.json({ message: error });
    });
};
