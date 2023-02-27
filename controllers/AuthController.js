const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserModel = require("../models/User");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");

//services
const { createJWToken } = require("../services/common/createJWToken");
const { sendMail } = require("../services/common/sendMail");
/**
 * User registration.
 *
 * @param {string}      name
 * @param {string}      username
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */

const register = async (req, res) => {
  try {
    // Create User object with escaped and trimmed data.
    let user = new UserModel({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    let userExist = await UserModel.findOne({ email: req.body.email });

    if (userExist) {
      return apiResponse.ErrorResponse(res, "User Exists");
    }

    // Save user in the database
    let newUser = await user.save();

    if (!newUser) {
      return apiResponse.ErrorResponse(res, "Something went wrong");
    }

    // // Prepare token for the user
    let userData = {
      _id: newUser._id,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
    };

    const data = createJWToken(userData);

    //add token to user
    await UserModel.findOneAndUpdate(
      { _id: newUser._id },
      { verificationToken: data.token },
      { upsert: true }
    );

    // sending mail
    sendMail(
      res,
      newUser.email,
      "Welcome to Bookish Nearby",
      "This is Welcome message",
      `<h1>Welcome to the bookish nearby ${data.name}</h1><br>To active your account please enter verify your email address throw this link <a href="https://localhost:500/verify/${data.token}`
    );

    return apiResponse.successResponse(res, "User registered successfully");
  } catch (err) {
    //throw error in json response with status 500.
    return apiResponse.ErrorResponse(res, err);
  }
};

/**
 * User login.
 *
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
const login = async (req, res) => {
  try {
    //check if user exists
    let user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return apiResponse.unauthorizedResponse(res, "User not found");
    }

    if (user) {
      //Compare given password with db's hash.
      let isMatch = user.comparePassword(req.body.password);
      if (!isMatch) {
        return apiResponse.unauthorizedResponse(res, "Invalid Password");
      }

      if (!user.verified) {
        return apiResponse.unauthorizedResponse(
          res,
          "Your account is not verified."
        );
      }

      let userData = {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      };

      const data = createJWToken(userData);

      //send response
      return apiResponse.successResponseWithData(res, "Login Success.", data);
    }
  } catch (err) {
    return apiResponse.ErrorResponse(res, err);
  }
};

const forgotPassword = async (req, res) => {
  try {
    //check if user exists
    let user = await UserModel.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      return apiResponse.unauthorizedResponse(res, "User not found");
    }

    if (user) {
      let userData = {
        email: user.email,
        _id: user._id,
      };
      //Generate JWT token
      let passwordResetCode = createJWToken(userData);
      const { token } = passwordResetCode;

      let updated = await UserModel.updateOne(
        {
          _id: user._id,
        },
        {
          $set: {
            passwordResetToken: token,
          },
        }
      );

      if (updated) {
        //send mail
        await sendMail(
          user.email,
          "Reset Password",
          "Reset your Password",
          `<a href="http://localhost:3000/reset-password/${token}">Reset Password</a>`
        );

        return apiResponse.successResponseWithData(
          res,
          "Password reset code sent successfully",
          passwordResetCode
        );
      }
    }
  } catch (err) {
    return apiResponse.ErrorResponse(res, err);
  }
};

const resetPassword = async (req, res) => {
  const token = req.params.token;

  try {
    if (!token) {
      return apiResponse.unauthorizedResponse(
        res,
        "Invalid token, Access Denied"
      );
    }

    if (!UserModel.findOne({ token })) {
      return apiResponse.unauthorizedResponse(
        res,
        "Invalid token, Access Denied"
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user = await UserModel.findById(decoded._id);

    if (!user) {
      return apiResponse.unauthorizedResponse(res, "User not found");
    }

    let salt = bcrypt.genSaltSync(10);
    console.log(req.body.password);
    let hashPassword = bcrypt.hashSync(req.body.password, salt);

    console.log(hashPassword);
    if (user) {
      await UserModel.updateOne(
        {
          _id: user._id,
        },
        {
          $set: {
            password: hashPassword,
            passwordResetToken: null,
          },
        }
      );

      //send response
      return apiResponse.successResponse(res, "Password reset successfully");
    }
  } catch (err) {
    return apiResponse.ErrorResponse(res, err);
  }
};

/**
 * Verify Confirm otp.
 *
 * @param {string}      email
 * @param {string}      otp
 *
 * @returns {Object}
 */

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};

/**
 * Resend Confirm otp.
 *
 * @param {string}      email
 *
 * @returns {Object}
 */
// exports.resendConfirmOtp = [
//   body("email")
//     .isLength({ min: 1 })
//     .trim()
//     .withMessage("Email must be specified.")
//     .isEmail()
//     .withMessage("Email must be a valid email address."),
//   sanitizeBody("email").escape(),
//   (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return apiResponse.validationErrorWithData(
//           res,
//           "Validation Error.",
//           errors.array()
//         );
//       } else {
//         var query = { email: req.body.email };
//         UserModel.findOne(query).then((user) => {
//           if (user) {
//             //Check already confirm or not.
//             if (!user.isConfirmed) {
//               // Generate otp
//               let otp = utility.randomNumber(4);
//               // Html email body
//               let html =
//                 "<p>Please Confirm your Account.</p><p>OTP: " + otp + "</p>";
//               // Send confirmation email
//               mailer
//                 .send(
//                   constants.confirmEmails.from,
//                   req.body.email,
//                   "Confirm Account",
//                   html
//                 )
//                 .then(function () {
//                   user.isConfirmed = 0;
//                   user.confirmOTP = otp;
//                   // Save user.
//                   user.save(function (err) {
//                     if (err) {
//                       return apiResponse.ErrorResponse(res, err);
//                     }
//                     return apiResponse.successResponse(
//                       res,
//                       "Confirm otp sent."
//                     );
//                   });
//                 });
//             } else {
//               return apiResponse.unauthorizedResponse(
//                 res,
//                 "Account already confirmed."
//               );
//             }
//           } else {
//             return apiResponse.unauthorizedResponse(
//               res,
//               "Specified email not found."
//             );
//           }
//         });
//       }
//     } catch (err) {
//       return apiResponse.ErrorResponse(res, err);
//     }
//   },
// ];
