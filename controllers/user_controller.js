const md5 = require("md5");
const userModel = require("../models/index").user;

const path = require(`path`);
const fs = require(`fs`);

// import sequelize operator
const sequelize = require(`sequelize`);
const operator = sequelize.Op;

exports.getUserData = async (request, response) => {
  await userModel
    .findAll()
    .then((result) => {
      return response.json({ count: result.length, data: result });
    })
    .catch((error) => {
      return response.json({ message: error.message });
    });
};

exports.findUserData = async (request, response) => {
  let keyword = request.body.keyword;

  await userModel
    .findAll({
      where: {
        [operator.or]: {
          user_name: { [operator.like]: `%${keyword}%` },
          user_email: { [operator.like]: `%${keyword}%` },
        },
      },
    })
    .then((result) => {
      return response.json({ count: result.length, data: result });
    })
    .catch((error) => {
      return response.json({ message: error.message });
    });
};

exports.addUserData = async (request, response) => {
  // handle upload photo
  console.log();
  if (!request.file) {
    return response.json({
      message: "Nothing to upload!",
    });
  }
  // request data
  let requestData = {
    user_name: request.body.user_name,
    user_email: request.body.user_email,
    user_password: md5(request.body.user_password),
    user_role: request.body.user_role,
    user_photo: request.file.filename,
  };

  await userModel
    .create(requestData)
    .then((result) => {
      return response.json({
        statusCode: response.statusCode,
        message: "New user has been created",
      });
    })
    .catch((error) => {
      return response.json({
        message: error.message,
      });
    });
};

exports.updateUserData = async (request, response) => {
  //get user_id
  let userId = request.params.user_id;

  //get data for check before update
  let userData = await userModel.findOne({
    where: { user_id: userId },
  });
  if (userData == null) {
    return response.json({
      message: "Data Not Found!",
    });
  }

  let requestData = {
    user_name: request.body.user_name,
    user_email: request.body.user_email,
    user_password: md5(request.body.user_password),
    user_role: request.body.user_role,
  };

  if (request.file) {
    let dataUser = await userModel.findOne({ where: { user_id: userId } });
    let oldPhotoPath = dataUser.user_photo;

    //delete photo
    let photoPath = path.join(__dirname, "../assets/image", oldPhotoPath);
    fs.unlink(photoPath, (error) => console.log(error));

    // add new data photo
    requestData.user_photo = request.file.filename;
  }

  await userModel
    .update(requestData, { where: { user_id: userId } })
    .then((result) => {
      return response.json({
        statusCode: response.statusCode,
        message: "Data user has been updated",
      });
    })
    .catch((error) => {
      return response.json({
        message: error.message,
      });
    });
};

exports.deleteUserData = async (request, response) => {
  //get user id
  let userId = request.params.user_id;

  //get data for check before update
  let userData = await userModel.findOne({
    where: { user_id: userId },
  });
  if (userData == null) {
    return response.json({
      message: "Data Not Found!",
    });
  }

  //delete photo path
  if (userData) {
    let oldPhotoPath = userData.user_photo;

    //delete photo
    let photoPath = path.join(__dirname, "../assets/image", oldPhotoPath);
    fs.unlink(photoPath, (error) => console.log(error));
  }

  userModel
    .destroy({ where: { user_id: userId } })
    .then((result) => {
      return response.json({
        statusCode: response.statusCode,
        message: "Data user has been deleted",
      });
    })
    .catch((error) => {
      return response.json({
        message: error.message,
      });
    });
};
