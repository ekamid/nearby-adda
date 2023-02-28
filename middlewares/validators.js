const { body, validationResult } = require("express-validator");
const UserModel = require("../models/User");

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

const registerValidate = (req, res, next) => {
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

const loginValidate = (req, res, next) => {
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

module.exports = {
  registerValidationRules,
  registerValidate,
  loginValidationRules,
  loginValidate,
};

// const registerValidation = [
//   body("name")
//     .isLength({ min: 1 })
//     .trim()
//     .withMessage("First name must be specified.")
//     .isAlphanumeric()
//     .withMessage("First name has non-alphanumeric characters."),

//   body("username")
//     .isLength({ min: 1 })
//     .trim()
//     .withMessage("Username must be specified.")
//     .isAlphanumeric()
//     .withMessage("Username has non-alphanumeric characters.")
//     .custom((value) => {
//       return UserModel.findOne({ username: value }).then((user) => {
//         if (user) {
//           return Promise.reject("Username already exists");
//         }
//       });
//     }),
//   body("email")
//     .isLength({ min: 1 })
//     .trim()
//     .withMessage("Email must be specified.")
//     .isEmail()
//     .withMessage("Email must be a valid email address.")
//     .custom((value) => {
//       return UserModel.findOne({ email: value }).then((user) => {
//         if (user) {
//           return Promise.reject("E-mail already in use");
//         }
//       });
//     }),
//   body("password")
//     .isLength({ min: 6 })
//     .trim()
//     .withMessage("Password must be 6 characters or greater."),

//   body("passwordConfirmation").custom((value, { req }) => {
//     if (value !== req.body.password) {
//       throw new Error("Passwords don't match");
//     }
//     return true;
//   }),
//   (res, req, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.array() });
//     }
//     next();
//   },
// ];

// module.exports = { registerValidation };
