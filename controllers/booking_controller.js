const bookingModel = require("../models/index").booking;

// import sequelize operator
const sequelize = require(`sequelize`);
const operator = sequelize.Op;

exports.getBookingData = async (request, response) => {
  await bookingModel
    .findAll({
      include: [
        "room_type",
        "user"
      ]
    })
    .then((result) => {
      return response.json({ count: result.length, data: result });
    })
    .catch((error) => {
      return response.json({ message: error.message });
    });
};

exports.findBookingData = async (request, response) => {
  let keyword = request.body.keyword;
  let bookingCheckInDate = request.body.booking_check_in_date;
  let bookingCheckOutDate = request.body.booking_check_out_date;

  await bookingModel
    .findAll({
      include: [
        "room_type",
        "user"
      ],
      where: {
        [operator.or]: {
          booking_number: { [operator.like]: `%${keyword}%` },
          booking_name: { [operator.like]: `%${keyword}%` },
          booking_email: { [operator.like]: `%${keyword}%` },
          booking_guest_name: { [operator.like]: `%${keyword}%` },
        },
        booking_check_in_date: {[operator.between]:[bookingCheckInDate, bookingCheckOutDate]}
      },
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
    user_id: request.body.user_id
  };

  await bookingModel
    .create(requestData)
    .then((result) => {
      return response.json({
        statusCode: response.statusCode,
        message: "New user has been created",
      });
    })
    .catch((error) => {
      return response.json({
        message: error.message,
      });
    });
};

exports.updateBookingData = async (request, response) => {
  //get booking_id
  let bookingId = request.params.booking_id;

  //get data for check before update
  let BookingData = await bookingModel.findOne({
    where: { booking_id: bookingId },
  });
  if (BookingData == null) {
    return response.json({
      message: "Data Not Found!",
    });
  }

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
    user_id: request.body.user_id
  };

  await bookingModel
    .update(requestData, { where: { booking_id: bookingId } })
    .then((result) => {
      return response.json({
        statusCode: response.statusCode,
        message: "Data user has been updated",
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

  //get data for check before update
  let BookingData = await bookingModel.findOne({
    where: { booking_id: bookingId },
  });
  if (BookingData == null) {
    return response.json({
      message: "Data Not Found!",
    });
  }

  bookingModel
    .destroy({ where: { booking_id: bookingId } })
    .then((result) => {
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
