const {body} = require(`express-validator`)

exports.validate = [
      // validasi password
      body(`user_password`)
        .notEmpty()
        .withMessage(`Password must be filled`)
        .isLength({ min: 8 })
        .withMessage(`Password at least 8 characters`),
        // validasi username
        body(`user_name`).notEmpty().withMessage(`Username must be filled`),
];
