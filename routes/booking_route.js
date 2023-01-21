const express = require('express')
const app = express()

app.use(express.json())

// connect the controller
const bookingController = require("../controllers/booking_controller")

// connect the middlewares
const authorization = require("../middlewares/authorization")

// find data room
app.post("/find", [authorization.authorization], bookingController.findBookingData)

// get data room
app.get("/",[authorization.authorization], bookingController.getBookingData)

// post data room
app.post("/",[authorization.authorization], bookingController.addBookingData)

//delete data room
app.delete("/:booking_id",[authorization.authorization], bookingController.deleteBookingData)

module.exports = app