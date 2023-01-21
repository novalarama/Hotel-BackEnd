const{body} = require(`express-validator`)

exports.validate = [
    body(`user_password`)
    .isLength({ min : 8})
    .withMessage(`Password must be filled by 8 character`)
    .notEmpty()
    .withMessage(`Password must be filled`),

    body(`user_name`).notEmpty()
    .withMessage(`Username must be filled`)
]