const bookingModel = require("../models/index").booking;
const bookingDetailModel = require("../models/index").booking_detail;
const roomModel = require("../models/index").room;
const roomTypeModel = require("../models/index").room_type;

// import sequelize operator
const sequelize = require(`sequelize`);
const operator = sequelize.Op;

exports.getBookingData = async (request, response) => {
  await bookingModel
    .findAll({
      include: ["room_type", "user"],
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
      include: ["room_type", "user"],
      where: {
        [operator.or]: {
          booking_number: { [operator.like]: `%${keyword}%` },
          booking_name: { [operator.like]: `%${keyword}%` },
          booking_email: { [operator.like]: `%${keyword}%` },
          booking_guest_name: { [operator.like]: `%${keyword}%` },
        },
        booking_check_in_date: {
          [operator.between]: [bookingCheckInDate, bookingCheckOutDate],
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

  // get data room where room is available and for check the data isn't null
  let roomsData = await roomModel.findAll({
    where: {
      room_type_id: requestData.room_type_id,
      room_is_available: true,
    },
  });


  // process add detail
  if (roomsData == null || roomsData.length < requestData.booking_number_of_rooms) {
    return response.json({
      message: "Data not found!",
    });
  } else {
    await bookingModel
      .create(requestData)
      .then(async (result) => {
        // change status room

        let roomTypeData = await roomTypeModel.findOne({
          where: { room_type_id: requestData.room_type_id },
        });

        let roomsDataSelected = [];

        // process add data room where status is available to one list
        for (let i = 0; i < roomsData.length; i++) {
          roomsDataSelected.push(roomsData[i]);
          roomModel.update(
            { room_is_available: false },
            { where: { room_id: roomsData[i].room_id } }
          );
        }

        // process to add booking detail
        let checkInDate = new Date(requestData.booking_check_in_date);
        let checkOutDate = new Date(requestData.booking_check_out_date);
        let dayTotal =
          (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24);

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
          data: roomsDataSelected,
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

  // change status room_is_available to true
  let allBookingDetailData = await bookingDetailModel.findAll({
    where: { booking_id: bookingId },
  });

  for (let i = 0; i < allBookingDetailData.length; i++) {
    await roomModel.update(
      { room_is_available: true },
      {where: { room_id: allBookingDetailData[i].room_id },}
    );
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
