const express = require('express')
const app = express()

app.use(express.json())

// connect the controller
const roomTypeController = require("../controllers/room_type_controller")

// find data type room
app.post("/find", roomTypeController.findRoomTypeData)

// get data type room
app.get("/", roomTypeController.getRoomTypeData)

// post data type room
app.post("/", roomTypeController.addRoomTypeData)

//update data type room
app.put("/:room_type_id", roomTypeController.updateRoomTypeData)

//delete data room type
app.delete("/:room_type_id", roomTypeController.deleteRoomTypeData)

module.exports = app