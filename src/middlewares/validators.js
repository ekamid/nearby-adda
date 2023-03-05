const { body, validationResult } = require("express-validator");
const UserModel = require("../models/User");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];

  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

const registerValidationRules = () => {
  return [
    body("name")
      .isLength({ min: 1 })
      .trim()
      .withMessage("name must be specified."),

    body("username")
      .isLength({ min: 3 })
      .trim()
      .withMessage("Username must be specified.")
      .custom((value) => {
        return UserModel.findOne({ username: value }).then((user) => {
          if (user) {
            return Promise.reject("Username already exists");
          }
        });
      }),
    body("email")
      .isLength({ min: 1 })
      .trim()
      .withMessage("Email must be specified.")
      .isEmail()
      .withMessage("Email must be a valid email address.")
      .custom((value) => {
        return UserModel.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("Email already in use");
          }
        });
      }),
    body("password")
      .isLength({ min: 6 })
      .trim()
      .withMessage("Password must be 6 characters or greater."),

    body("passwordConfirmation").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match");
      }
      return true;
    }),
    (res, req, next) => {
      next();
    },
  ];
};

const loginValidationRules = () => {
  return [
    body("email")
      .isLength({ min: 1 })
      .trim()
      .withMessage("Email must be specified.")
      .isEmail()
      .withMessage("Email must be a valid email address."),

    body("password")
      .isLength({ min: 6 })
      .trim()
      .withMessage("Password must be 6 characters or greater."),

    (res, req, next) => {
      next();
    },
  ];
};

const updateAddressValidationRules = () => {
  return [
    body("address")
      .isLength({ min: 1 })
      .trim()
      .withMessage("Address must be specified."),

    body("latitude")
      .isFloat("latitude must be valid")
      .custom((value, { req }) => {
        if (value < -90 || value > 90) {
          throw new Error("Latitude is not in the range");
        }
        return true;
      }),

    body("longitude")
      .isFloat("longitude must be valid")
      .custom((value, { req }) => {
        if (value < -180 || value > 180) {
          throw new Error("Longitude is not in the range");
        }
        return true;
      }),

    (res, req, next) => {
      next();
    },
  ];
};

module.exports = {
  validate,
  registerValidationRules,
  loginValidationRules,
  updateAddressValidationRules,
};
