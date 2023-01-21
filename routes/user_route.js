const express = require('express')
const app = express()

app.use(express.json())

// connect the controller
const userController = require("../controllers/user_controller")

//connect middleware
const uploadImage = require("../middlewares/uploadImage")
const authorization = require("../middlewares/authorization")
const userValidator = require("../middlewares/userValidator")

// for authentication
app.post("/auth", userController.authentication)

// find data type room
app.post("/find", [authorization.authorization], userController.findUserData)

// get data type room
app.get("/", [authorization.authorization], userController.getUserData)

// post data type room
app.post("/", [userValidator.validate, uploadImage.upload.single(`user_photo`), authorization.authorization], userController.addUserData)

//update data type room
app.put("/:user_id", [userValidator.validate, uploadImage.upload.single(`user_photo`), authorization.authorization], userController.updateUserData)

//delete data room type
app.delete("/:user_id", [authorization.authorization], userController.deleteUserData)

module.exports = app