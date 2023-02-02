const {check} = require(`express-validator`)

exports.validate = [
  check('user_password')
  .notEmpty()
  .withMessage(`Password must be filled`)
  .isLength({ min: 8 })
  .withMessage(`Password at least 8 characters`),
  check(`user_name`)
  .notEmpty().withMessage(`Username must be filled`),
  check(`user_email`)
  .isEmail().withMessage(`Format Email isn't suitable`)
]
