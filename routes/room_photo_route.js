const express = require('express')
const app = express()

app.use(express.json())

// connect the controller
const roomPhotoController = require("../controllers/room_photo_controller")

//connect middleware
const uploadImage = require("../middlewares/uploadImage")

// get data type room
app.get("/", roomPhotoController.getRoomPhotoData)

// post data type room
app.post("/", [uploadImage.upload.single(`room_photo_path`)], roomPhotoController.addRoomPhotoData)

//update data type room
app.put("/:room_photo_id", [uploadImage.upload.single(`room_photo_path`)], roomPhotoController.updateRoomPhotoData)

//delete data room type
app.delete("/:room_photo_id", roomPhotoController.deleteRoomPhotoData)

module.exports = app