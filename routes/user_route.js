const express = require('express')
const app = express()

app.use(express.json())

// connect the controller
const userController = require("../controllers/user_controller")

// get data room
app.get("/", userController.getDataUser)

module.exports = app