const express = require('express')
const app = express()

app.use(express.json())

// connect the controller
const bookingController = require("../controllers/booking_controller")

// find data room
app.post("/find", bookingController.findBookingData)

// get data room
app.get("/", bookingController.getBookingData)

// post data room
app.post("/", bookingController.addBookingData)

//update data room
app.put("/:booking_id", bookingController.updateBookingData)

//delete data room
app.delete("/:booking_id", bookingController.deleteBookingData)

module.exports = app