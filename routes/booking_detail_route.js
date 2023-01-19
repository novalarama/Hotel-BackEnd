const express = require('express')
const app = express()

app.use(express.json())

// connect the controller
const bookingDetailController = require("../controllers/booking_detail_controller")

// find data room
app.post("/find", bookingDetailController.findBookingDetailData)

// get data room
app.get("/", bookingDetailController.getBookingDetailData)

// post data room
app.post("/", bookingDetailController.addBookingDetailData)

//update data room
app.put("/:booking_detail_id", bookingDetailController.updateBookingDetailData)

//delete data room
app.delete("/:booking_detail_id", bookingDetailController.deleteBookingDetailData)

module.exports = app