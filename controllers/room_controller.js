const roomModel = require("../models/index").room;
const roomTypeModel = require("../models/index").room_type;

const path = require(`path`);
const fs = require(`fs`);

// import sequelize operator
const sequelize = require(`sequelize`);
const operator = sequelize.Op;

exports.getRoomData = async (request, response) => {
  await roomModel
    .findAll({
      include: ["room_type"],
    })
    .then((result) => {
      return response.json({ count: result.length, data: result });
    })
    .catch((error) => {
      return response.json({ message: error.message });
    });
};

exports.findRoomData = async (request, response) => {
  let keyword = request.body.keyword;

  await roomModel
    .findAll({
      include: ["room_type"],
      where: {
        [operator.or]: {
          room_number: { [operator.like]: `%${keyword}%` },
          room_id: { [operator.like]: `%${keyword}%` },
          room_is_available: { [operator.like]: `%${keyword}%` },
        },
      },
    })
    .then((result) => {
      return response.json({ count: result.length, data: result });
    })
    .catch((error) => {
      return response.json({ message: error.message });
    });
};

exports.addRoomData = async (request, response) => {
  // request data
  let requestData = {
    room_number: request.body.room_number,
    room_id: request.body.room_id,
    room_is_available: request.body.room_is_available,
  };

  await roomModel
    .create(requestData)
    .then((result) => {
      return response.json({
        statusCode: response.statusCode,
        message: "New room has been created",
      });
    })
    .catch();
};

exports.updateRoomData = async (request, response) => {
  //get room_id
  let roomId = request.params.room_id;

  //get data for check before update
  let roomData = await roomModel.findOne({ where: { room_id: roomId } });
  if (roomData == null) {
    return response.json({
      message: "Data Not Found!",
    });
  }

  let requestData = {
    room_number: request.body.room_number,
    room_id: request.body.room_id,
    room_is_available: request.body.room_is_available,
  };

  roomModel
    .update(requestData, { where: { room_id: roomId } })
    .then((result) => {
      return response.json({
        statusCode: response.statusCode,
        message: "Data room has been updated",
      });
    })
    .catch((error) => {
      return response.json({
        message: error.message,
      });
    });
};

exports.deleteRoomData = async (request, response) => {
  //get room type id
  let roomId = request.params.room_id;

  //get data for check before delete
  let roomData = await roomModel.findOne({ where: { room_id: roomId } });
  if (roomData == null) {
    return response.json({
      message: "Data Not Found!",
    });
  }

  await roomModel
    .destroy({ where: { room_id: roomId } })
    .then((result) => {
      return response.json({
        statusCode: response.statusCode,
        message: "Data room has been deleted",
      });
    })
    .catch((error) => {
      return response.json({
        message: error.message,
      });
    });
};
