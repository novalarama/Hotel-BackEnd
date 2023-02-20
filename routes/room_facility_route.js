const express = require('express')
const app = express()

app.use(express.json())

// connect the controller
const roomFacilityController = require("../controllers/room_facility_controller")

// connect the middlewares
const authorization = require("../middlewares/authorization")

// get data facility room
app.get("/", [authorization.authorization], roomFacilityController.getRoomFacilityData)

app.get("/:room_type_id", [authorization.authorization], roomFacilityController.getRoomFacilityDataWthRoomTypeId)

// post data facility room
app.post("/", [authorization.authorization], roomFacilityController.addRoomFacilityData)

//update data facility room
app.put("/:room_facility_id", [authorization.authorization], roomFacilityController.updateRoomFacilityData)

//delete data room facility
app.delete("/:room_facility_id", [authorization.authorization], roomFacilityController.deleteRoomFacilityData)

module.exports = app