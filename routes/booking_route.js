const express = require('express')
const app = express()

app.use(express.json())

// connect the controller
const bookingController = require("../controllers/booking_controller")

// get data room
app.get("/", bookingController.getDataBooking)

module.exports = app