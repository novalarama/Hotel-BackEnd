const bookingDetailModel = require("../models/index").booking_detail;
const roomModel = require("../models/index").room;

// import sequelize operator
const sequelize = require(`sequelize`);
const operator = sequelize.Op;


exports.getBookingDetailData = async (request, response) => {
  await bookingDetailModel
    .findAll({})
    .then((result) => {
      return response.json({ count: result.length, data: result });
    })
    .catch((error) => {
      return response.json({ message: error.message });
    });
};

exports.findBookingDetailData = async (request, response) => {
  let keyword = request.body.keyword;
  let accessDate = request.body.access_date;

  await bookingDetailModel
    .findAll({
      include: [
        "booking",
        "room",
        "room_type"
      ],
      where: {
        [operator.or]: {
          access_date: { [operator.like]: `%${keyword}%` },
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

exports.deleteBookingDetailData = async (request, response) => {
  //get user id
  let bookingDetailId = request.params.booking_detail_id;

  //get data for check before update
  let BookingDetailData = await bookingDetailModel.findOne({
    where: { booking_detail_id: bookingDetailId },
  });
  if (BookingDetailData == null) {
    return response.json({
      message: "Data Not Found!",
    });
  }

  bookingDetailModel
    .destroy({ where: { booking_id: bookingDetailId } })
    .then((result) => {
      return response.json({
        statusCode: response.statusCode,
        message: "Data booking detail has been deleted",
      });
    })
    .catch((error) => {
      return response.json({
        message: error.message,
      });
    });
};
