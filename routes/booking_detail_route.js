const express = require('express')
const app = express()

app.use(express.json())

// connect the controller
const bookingDetailController = require("../controllers/booking_detail_controller")

// get data room
app.get("/", bookingDetailController.getDataBookingDetail)

module.exports = app