const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// connect the controller
const userController = require("../controllers/user_controller")

//connect middleware
const uploadImage = require("../middlewares/uploadImage")
const authorization = require("../middlewares/authorization")
const validate = require("../middlewares/userValidator")

// for authentication
app.post("/auth", userController.authentication)

// find data user
app.post("/find", [validate.validate, authorization.authorization], userController.findUserData)

// get data user
app.get("/", [authorization.authorization], userController.getUserData)

// post data user
app.post("/", [uploadImage.upload.single(`user_photo`), validate.validate, authorization.authorization], userController.addUserData)

//update data user
app.put("/:user_id", [uploadImage.upload.single(`user_photo`), authorization.authorization], userController.updateUserData)

//delete data user
app.delete("/:user_id", [authorization.authorization], userController.deleteUserData)

module.exports = app