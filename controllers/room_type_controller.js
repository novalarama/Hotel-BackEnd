const roomTypeModel = require("../models/index").room_type;

const path = require(`path`);
const fs = require(`fs`);

// import sequelize operator
const sequelize = require(`sequelize`);
const operator = sequelize.Op;

exports.getRoomTypeData = async (request, response) => {
  await roomTypeModel
    .findAll()
    .then((result) => {
      return response.json({ count: result.length, data: result });
    })
    .catch((error) => {
      return response.json({ message: error.message });
    });
};

exports.findRoomTypeData = async (request, response) => {
  let keyword = request.body.keyword;

  let dataRoomTyp = await roomTypeModel
    .findAll({
      where: {
        [operator.or]: {
          room_type_name: { [operator.like]: `%${keyword}%` },
          room_type_price: { [operator.like]: `%${keyword}%` },
          room_type_description: { [operator.like]: `%${keyword}%` },
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

exports.addRoomTypeData = async (request, response) => {
  // request data
  let requestData = {
    room_type_name: request.body.room_type_name,
    room_type_price: request.body.room_type_price,
    room_type_description: request.body.room_type_description,
  };

  await roomTypeModel
    .create(requestData)
    .then((result) => {
      return response.json({
        statusCode: response.statusCode,
        message: "New type room has been created",
      });
    })
    .catch();
};

exports.updateRoomTypeData = async (request, response) => {
  //get room_type_id
  let roomTypeId = request.params.room_type_id;

  let requestData = {
    room_type_name: request.body.room_type_name,
    room_type_price: request.body.room_type_price,
    room_type_description: request.body.room_type_description,
  };

  roomTypeModel.update(
    requestData,
    { where: { room_type_id: roomTypeId } })
      .then(result => {
        return response.json({
          statusCode: response.statusCode,
          message: "Data room type has been updated",
        });
      })
      .catch((error) => {
        return response.json({
          message: error.message,
        });
      })
};

exports.deleteRoomTypeData = async(request, response) => {
    //get room type id
    let roomTypeId = request.params.room_type_id

    //get data before delete it
    let roomTypeData = await roomTypeModel.findOne({where: {room_type_id: roomTypeId}})

    roomTypeModel.destroy({where: {room_type_id: roomTypeId}})
    .then(result => {
        return response.json({
            statusCode : response.statusCode,
            message : "Data room type has been deleted"
        })
    })
    .catch(error => {
        return response.json({
            message : error.message
        })
    })
}
