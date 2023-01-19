const express = require('express')
const app = express()

app.use(express.json())

// connect the controller
const roomController = require("../controllers/room_controller")

// find data room
app.post("/find", roomController.findRoomData)

// get data room
app.get("/", roomController.getRoomData)

// post data room
app.post("/", roomController.addRoomData)

//update data room
app.put("/:room_id", roomController.updateRoomData)

//delete data room
app.delete("/:room_id", roomController.deleteRoomData)

module.exports = app