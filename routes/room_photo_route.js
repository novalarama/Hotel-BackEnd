const express = require('express')
const app = express()

app.use(express.json())

// connect the controller
const roomPhotoController = require("../controllers/room_photo_controller")

//connect middleware
const uploadImage = require("../middlewares/uploadImage")
const authorization = require("../middlewares/authorization")

// get data type room
app.get("/",[authorization.authorization], roomPhotoController.getRoomPhotoData)

// post data type room
app.post("/", [uploadImage.upload.single(`room_photo_path`), authorization.authorization], roomPhotoController.addRoomPhotoData)

//update data type room
app.put("/:room_photo_id", [uploadImage.upload.single(`room_photo_path`), authorization.authorization], roomPhotoController.updateRoomPhotoData)

//delete data room type
app.delete("/:room_photo_id", [authorization.authorization], roomPhotoController.deleteRoomPhotoData)

module.exports = app