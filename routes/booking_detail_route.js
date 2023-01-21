const express = require('express')
const app = express()

app.use(express.json())

// connect the controller
const bookingDetailController = require("../controllers/booking_detail_controller")

// connect the middlewares
const authorization = require("../middlewares/authorization")

// find data room
app.post("/find", [authorization.authorization], bookingDetailController.findBookingDetailData)

// get data room
app.get("/", [authorization.authorization], bookingDetailController.getBookingDetailData)

//delete data room
app.delete("/:booking_detail_id", [authorization.authorization], bookingDetailController.deleteBookingDetailData)

module.exports = app