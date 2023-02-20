const roomPhotoModel = require("../models/index").room_photo;

const path = require(`path`);
const fs = require(`fs`);

// import sequelize operator
const sequelize = require(`sequelize`);
const operator = sequelize.Op;

exports.getRoomPhotoData = async (request, response) => {
  await roomPhotoModel
    .findAll()
    .then((result) => {
      return response.json({ count: result.length, data: result });
    })
    .catch((error) => {
      return response.json({ message: error.message });
    });
};

exports.getRoomPhotoDataWthRoomTypeId = async (request, response) => {
  let roomTypeId = request.params.room_type_id;
  await roomPhotoModel
    .findAll({where: {room_type_id: roomTypeId}})
    .then((result) => {
      return response.json({ count: result.length, data: result });
    })
    .catch((error) => {
      return response.json({ message: error.message });
    });
};

exports.addRoomPhotoData = async (request, response) => {
  // handle upload photo
  console.log();
  if (!request.file) {
    return response.json({
      message: "Nothing to upload!",
    });
  }
  // request data
  let requestData = {
    room_photo_path: request.file.filename,
    room_type_id: request.body.room_type_id,
  };

  await roomPhotoModel
    .create(requestData)
    .then((result) => {
      return response.json({
        statusCode: response.statusCode,
        message: "New room photo has been created"
      });
    })
    .catch((error) => {
      return response.json({
        message: error.message,
      });
    });
};

exports.updateRoomPhotoData = async (request, response) => {
  //get room_photo_id
  let roomPhotoId = request.params.room_photo_id;

  //get data for check before update
  let RoomPhotoData = await roomPhotoModel.findOne({
    where: { room_photo_id: roomPhotoId },
  });
  if (RoomPhotoData == null) {
    return response.json({
      message: "Data Not Found!",
    });
  }

  let requestData = {
    room_type_id: request.body.room_type_id,
  };

  if (request.file) {
    let roomPhotoData = await roomPhotoModel.findOne({ where: { room_photo_id: roomPhotoId } });
    let oldPhotoPath = roomPhotoData.room_photo_path;

    //delete photo
    let photoPath = path.join(__dirname, "../assets/image", oldPhotoPath);
    fs.unlink(photoPath, (error) => console.log(error));

    // add new data photo
    requestData.room_photo_path = request.file.filename;
  }

  await roomPhotoModel
    .update(requestData, { where: { room_photo_id: roomPhotoId } })
    .then((result) => {
      return response.json({
        statusCode: response.statusCode,
        message: "Data room photo has been updated",
      });
    })
    .catch((error) => {
      return response.json({
        message: error.message,
      });
    });
};

exports.deleteRoomPhotoData = async (request, response) => {
  //get user id
  let roomPhotoId = request.params.room_photo_id;

  //get data for check before update
  let RoomPhotoData = await roomPhotoModel.findOne({
    where: { room_photo_id: roomPhotoId },
  });
  if (RoomPhotoData == null) {
    return response.json({
      message: "Data Not Found!",
    });
  }

  //delete photo path
  if (RoomPhotoData) {
    let oldPhotoPath = RoomPhotoData.room_photo_path;

    //delete photo
    let photoPath = path.join(__dirname, "../assets/image", oldPhotoPath);
    fs.unlink(photoPath, (error) => console.log(error));
  }

  roomPhotoModel
    .destroy({ where: { room_photo_id: roomPhotoId } })
    .then((result) => {
      return response.json({
        statusCode: response.statusCode,
        message: "Data room photo has been deleted",
      });
    })
    .catch((error) => {
      return response.json({
        message: error.message,
      });
    });
};
