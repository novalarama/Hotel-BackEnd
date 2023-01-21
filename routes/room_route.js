const express = require('express')
const app = express()

app.use(express.json())

// connect the controller
const roomController = require("../controllers/room_controller")

// connect the middlewares
const authorization = require("../middlewares/authorization")

// find data room
app.post("/find",[authorization.authorization], roomController.findRoomData)

// get data room
app.get("/",[authorization.authorization], roomController.getRoomData)

// post data room
app.post("/",[authorization.authorization], roomController.addRoomData)

//update data room
app.put("/:room_id",[authorization.authorization], roomController.updateRoomData)

//delete data room
app.delete("/:room_id",[authorization.authorization], roomController.deleteRoomData)

module.exports = app