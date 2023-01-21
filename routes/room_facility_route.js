const express = require('express')
const app = express()

app.use(express.json())

// connect the controller
const roomFacilityController = require("../controllers/room_facility")

// find data facility room
app.post("/find", roomFacilityController.findRoomFacilityData)

// get data facility room
app.get("/", roomFacilityController.getRoomFacilityData)

// post data facility room
app.post("/", roomFacilityController.addRoomFacilityData)

//update data facility room
app.put("/:room_facility_id", roomFacilityController.updateRoomFacilityData)

//delete data room facility
app.delete("/:room_facility_id", roomFacilityController.deleteRoomFacilityData)

module.exports = app