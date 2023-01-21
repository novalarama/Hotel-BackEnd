const express = require('express')
const app = express()

app.use(express.json())

// connect the controller
const roomTypeController = require("../controllers/room_type_controller")

// connect the middlewares
const authorization = require("../middlewares/authorization")

// find data type room
app.post("/find", [authorization.authorization], roomTypeController.findRoomTypeData)

// get data type room
app.get("/", [authorization.authorization], roomTypeController.getRoomTypeData)

// post data type room
app.post("/", [authorization.authorization], roomTypeController.addRoomTypeData)

//update data type room
app.put("/:room_type_id", [authorization.authorization], roomTypeController.updateRoomTypeData)

//delete data room type
app.delete("/:room_type_id", [authorization.authorization], roomTypeController.deleteRoomTypeData)

module.exports = app