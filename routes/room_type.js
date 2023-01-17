const express = require('express')
const app = express()

app.use(express.json())

// connect the controller
const roomTypeController = require("../controllers/room_type_controller")

// get data type room
app.get("/", roomTypeController.getDataRoomType)

module.exports = app