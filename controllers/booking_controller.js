const bookingModel = require("../models/index").booking;
const bookingDetailModel = require("../models/index").booking_detail;
const roomModel = require("../models/index").room;
const roomTypeModel = require("../models/index").room_type;
const userModel = require("../models/index").user;

const { where } = require("sequelize");
// import sequelize operator
const sequelize = require(`sequelize`);
const operator = sequelize.Op;

exports.getBookingData = async (request, response) => {
  let whereCondition = {};
  let bookingName = request.query.booking_name;
  let bookingCheckInDate = request.query.booking_check_in_date;

  if (bookingName !== '' && bookingCheckInDate !== '') {
    whereCondition = {
      booking_name: {
        [operator.like]: `%${bookingName}%`,
      },
      booking_check_in_date: {
        [operator.gte]: new Date(bookingCheckInDate),
        [operator.lt]: new Date(new Date(bookingCheckInDate).getTime() + 24 * 60 * 60 * 1000),
      },
    };
  } else if (bookingName !== '') {
    whereCondition = {
      booking_name: {
        [operator.like]: `%${bookingName}%`,
      },
    };
  } else if (bookingCheckInDate !== '') {
    whereCondition = {
      booking_check_in_date: {
        [operator.gte]: new Date(bookingCheckInDate),
        [operator.lt]: new Date(new Date(bookingCheckInDate).getTime() + 24 * 60 * 60 * 1000),
      },
    };
  } else {
    whereCondition = {}
  }

  await bookingModel
    .findAll({
      where: whereCondition,
      include: [
        {
          model: roomTypeModel,
          as: "room_type",
        },
        {
          model: userModel,
          as: "user",
        },
      ],
    })
    .then((result) => {
      return response.json({ count: result.length, data: result });
    })
    .catch((error) => {
      return response.json({ message: error.message });
    });
};

exports.addBookingData = async (request, response) => {
  // request data
  let requestData = {
    booking_number: request.body.booking_number,
    booking_name: request.body.booking_name,
    booking_email: request.body.booking_email,
    booking_date: request.body.booking_date,
    booking_check_in_date: request.body.booking_check_in_date,
    booking_check_out_date: request.body.booking_check_out_date,
    booking_guest_name: request.body.booking_guest_name,
    booking_number_of_rooms: request.body.booking_number_of_rooms,
    room_type_id: request.body.room_type_id,
    booking_status: request.body.booking_status,
    user_id: request.body.user_id,
  };

  // rooms data
  let roomsData = await roomModel.findAll({
    where: {
      room_type_id: requestData.room_type_id,
    },
  });

  // room type data
  let roomTypeData = await roomTypeModel.findOne({
    where: { room_type_id: requestData.room_type_id },
  });

  //  booking data
  let dataBooking = await roomTypeModel.findAll({
    attributes: ["room_type_id", "room_type_name"],
    where: { room_type_id: requestData.room_type_id },
    include: [
      {
        model: roomModel,
        as: "room",
        attributes: ["room_id", "room_type_id"],
        include: [
          {
            model: bookingDetailModel,
            as: "booking_detail",
            attributes: ["access_date"],
            where: {
              access_date: {
                [operator.between]: [
                  requestData.booking_check_in_date,
                  requestData.booking_check_out_date,
                ],
              },
            },
          },
        ],
      },
    ],
  });

  // get available rooms
  let bookedRoomIds = dataBooking[0].room.map((room) => room.room_id);
  let availableRooms = roomsData.filter(
    (room) => !bookedRoomIds.includes(room.room_id)
  );

  // process add data room where status is available to one list
  let roomsDataSelected = availableRooms.slice(
    0,
    requestData.booking_number_of_rooms
  );

  //count day
  let checkInDate = new Date(requestData.booking_check_in_date);
  let checkOutDate = new Date(requestData.booking_check_out_date);
  const dayTotal = Math.round(
    (checkOutDate - checkInDate) / (1000 * 3600 * 24)
  );

  // process add detail
  if (
    roomsData == null ||
    availableRooms.length < requestData.booking_number_of_rooms ||
    dayTotal == 0 ||
    roomsDataSelected == null
  ) {
    return response.json({
      message: "Room not available!",
    });
  } else {
    await bookingModel
      .create(requestData)
      .then(async (result) => {
        // process to add booking detail
        for (let i = 0; i < dayTotal; i++) {
          for (let j = 0; j < roomsDataSelected.length; j++) {
            let accessDate = new Date(checkInDate);
            accessDate.setDate(accessDate.getDate() + i);
            let requestDataDetail = {
              booking_id: result.booking_id,
              room_id: roomsDataSelected[j].room_id,
              access_date: accessDate,
              price: roomTypeData.room_type_price,
            };
            await bookingDetailModel.create(requestDataDetail);
          }
        }
        return response.json({
          data: result,
          statusCode: response.statusCode,
          message: "New user has been created",
        });
      })
      .catch((error) => {
        return response.json({
          message: error.message,
        });
      });
  }
};

exports.changeStatusBookingData = async (request, response) => {
  let bookingId = request.params.booking_id;

  //get data booking for check before update
  let BookingData = await bookingModel.findOne({
    where: { booking_id: bookingId },
  });
  if (BookingData == null) {
    return response.json({
      message: "Data Not Found!",
    });
  }

  let requestData = {
    booking_status: request.body.booking_status,
  };

  bookingModel
    .update(requestData, { where: { booking_id: bookingId } })
    .then(() => {
      return response.json({
        statusCode: response.statusCode,
        message: "Data status has been updated",
      });
    })
    .catch((error) => {
      return response.json({
        message: error.message,
      });
    });
};

exports.deleteBookingData = async (request, response) => {
  //get user id
  let bookingId = request.params.booking_id;

  //get data booking for check before update
  let BookingData = await bookingModel.findOne({
    where: { booking_id: bookingId },
  });
  if (BookingData == null) {
    return response.json({
      message: "Data Not Found!",
    });
  }

  //delete booking detail
  await bookingDetailModel.destroy({ where: { booking_id: bookingId } });

  bookingModel
    .destroy({ where: { booking_id: bookingId } })
    .then(async (result) => {
      return response.json({
        statusCode: response.statusCode,
        message: "Data user has been deleted",
      });
    })
    .catch((error) => {
      return response.json({
        message: error.message,
      });
    });
};
