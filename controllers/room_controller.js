const roomModel = require("../models/index").room;
const roomTypeModel = require("../models/index").room_type;
const bookingDetailModel = require("../models/index").booking_detail;

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

exports.getAvailableRooms = async (request, response) => {
  let checkInDate = request.body.check_in_date;
  let checkOutDate = request.body.check_out_date;

  let roomData = await roomTypeModel.findAll({
    attributes: ["room_type_id", "room_type_name"],
    include: [
      {
        model: roomModel,
        as: "room",
      },
    ],
  });

  let roomBookedData = await roomTypeModel.findAll({
    attributes: ["room_type_id", "room_type_name"],
    include: [
      {
        model: roomModel,
        as: "room",
        include: [
          {
            model: bookingDetailModel,
            as: "booking_detail",
            attributes: ["access_date"],
            where: {
              access_date: {
                [operator.between]: [checkInDate, checkOutDate],
              },
            },
          },
        ],
      },
    ],
  });

  let available = [];
  let availableByType = [];

  for (let i = 0; i < roomData.length; i++) {
    roomData[i].room.forEach((room) => {
      let isBooked = false;
      roomBookedData.forEach((booked) => {
        booked.room.forEach((bookedRoom) => {
          if (room.room_id === bookedRoom.room_id) {
            isBooked = true;
          }
        });
      });
      if (!isBooked) {
        available.push(room);
      }
    });
  }

  for (let i = 0; i < roomData.length; i++) {
    let roomType = {};
    roomType.room_type_id = roomData[i].room_type_id;
    roomType.room_type_name = roomData[i].room_type_name;
    roomType.room = [];
    available.forEach((room) => {
      if (room.room_type_id === roomData[i].room_type_id) {
        roomType.room.push(room);
      }
    });
    if (roomType.room.length > 0) {
      availableByType.push(roomType);
    }
  }

  return response.json({ roomAvailable: available, room: availableByType });
};

exports.findRoomData = async (request, response) => {
  let keyword = request.body.keyword;

  await roomModel
    .findAll({
      include: ["room_type"],
      where: {
        [operator.or]: {
          room_number: { [operator.like]: `%${keyword}%` },
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
    room_type_id: request.body.room_type_id,
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
    room_type_id: request.body.room_type_id,
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
