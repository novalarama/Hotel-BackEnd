const roomFacilityModel = require("../models/index").room_facility;

const path = require(`path`);
const fs = require(`fs`);

// import sequelize operator
const sequelize = require(`sequelize`);
const operator = sequelize.Op;

exports.getRoomFacilityData = async (request, response) => {
  await roomFacilityModel
    .findAll()
    .then((result) => {
      return response.json({ count: result.length, data: result });
    })
    .catch((error) => {
      return response.json({ message: error.message });
    });
};

exports.addRoomFacilityData = async (request, response) => {
  // handle upload photo
  console.log();
  if (!request.file) {
    return response.json({
      message: "Nothing to upload!",
    });
  }
  // request data
  let requestData = {
    room_facility_photo: request.file.filename,
    room_facility_name: request.body.room_facility_name,
    room_facility_description: request.body.room_facility_description,
    room_type_id: request.body.room_type_id,
  };

  await roomFacilityModel
    .create(requestData)
    .then((result) => {
      return response.json({
        statusCode: response.statusCode,
        message: "New room photo has been created",
      });
    })
    .catch((error) => {
      return response.json({
        message: error.message,
      });
    });
};

exports.updateRoomFacilityData = async (request, response) => {
  //get room_facility_id
  let roomFacilityId = request.params.room_facility_id;

  //get data for check before update
  let RoomFacilityData = await roomFacilityModel.findOne({
    where: { room_facility_id: roomFacilityId },
  });
  if (RoomFacilityData == null) {
    return response.json({
      message: "Data Not Found!",
    });
  }

  let requestData = {
    room_facility_name: request.body.room_facility_name,
    room_facility_description: request.body.room_facility_description,
    room_type_id: request.body.room_type_id,
  };

  if (request.file) {
    let roomFacilityData = await roomFacilityModel.findOne({ where: { room_facility_id: roomFacilityId } });
    let oldPhotoPath = roomFacilityData.room_facility_photo;

    //delete photo
    let photoPath = path.join(__dirname, "../assets/image", oldPhotoPath);
    fs.unlink(photoPath, (error) => console.log(error));

    // add new data photo
    requestData.room_facility_photo = request.file.filename;
  }

  await roomFacilityModel
    .update(requestData, { where: { room_facility_id: roomFacilityId } })
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

exports.deleteRoomFacilityData = async (request, response) => {
  //get user id
  let roomFacilityId = request.params.room_facility_id;

  //get data for check before update
  let RoomFacilityData = await roomFacilityModel.findOne({
    where: { room_facility_id: roomFacilityId },
  });
  if (RoomFacilityData == null) {
    return response.json({
      message: "Data Not Found!",
    });
  }

  //delete photo path
  if (RoomFacilityData) {
    let oldPhotoPath = RoomFacilityData.room_facility_photo;

    //delete photo
    let photoPath = path.join(__dirname, "../assets/image", oldPhotoPath);
    fs.unlink(photoPath, (error) => console.log(error));
  }

  roomFacilityModel
    .destroy({ where: { room_facility_id: roomFacilityId } })
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
