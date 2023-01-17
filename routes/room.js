const express = require('express')
const app = express()

app.use(express.json())

// connect the controller
const roomController = require("../controllers/room_controller")

// get data type room
app.get("/", roomController.getDataRoom)

module.exports = app