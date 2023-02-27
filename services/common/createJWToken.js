const jwt = require("jsonwebtoken");

exports.createJWToken = (userData) => {
  //Prepare JWT token for authentication
  const jwtPayload = userData;

  const jwtData = {
    expiresIn: process.env.JWT_EXPIRES_IN,
  };

  const secret = process.env.JWT_SECRET;

  //Generate JWT token
  userData.token = jwt.sign(jwtPayload, secret, jwtData);

  return userData;
};
