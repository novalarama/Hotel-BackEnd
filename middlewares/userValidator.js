const { check } = require(`express-validator`);

exports.validate = [
  (req, res, next) => {
    try {
        console.log('masuk sini 1'),
      // validasi password
      check(`user_password`)
        .notEmpty()
        .withMessage(`Password must be filled`)
        .isLength({ min: 8 })
        .withMessage(`Password at least 8 characters`),
        // validasi username
        check(`user_name`).notEmpty().withMessage(`Username must be filled`),
        next();
    } catch (error) {
        console.loglog('masuk sini')
      return res.json({ message: error.message });
    }
  },
];
