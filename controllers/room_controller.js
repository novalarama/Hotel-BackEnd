const roomModel = require("../models/index").room

const path = require(`path`)
const fs = require(`fs`)

// import sequelize operator
const sequelize = require(`sequelize`)
const operator = sequelize.Op

exports.getDataRoom = (req, res) => {
    roomModel.findAll()
        .then(result => {
            return res.json({
                count : result.length,
                room : result
            })
        })
        .catch(error => {
            return res.json({
                message: error.message
            })
        })
}