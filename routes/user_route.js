const express = require('express')
const app = express()

app.use(express.json())

// connect the controller
const userController = require("../controllers/user_controller")

//connect middleware
const uploadImage = require("../middlewares/uploadImage")

// find data type room
app.post("/find", userController.findUserData)

// get data type room
app.get("/", userController.getUserData)

// post data type room
app.post("/", [uploadImage.upload.single(`user_photo`)], userController.addUserData)

//update data type room
app.put("/:user_id", [uploadImage.upload.single(`user_photo`)], userController.updateUserData)

//delete data room type
app.delete("/:user_id", userController.deleteUserData)

module.exports = app