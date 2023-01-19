const express = require('express')
const app = express()

app.use(express.json())

// connect the controller
const roomPhotoController = require("../controllers/room_photo_controller")

// get data room
app.get("/", roomPhotoController.getDataRoomPhoto)

module.exports = app