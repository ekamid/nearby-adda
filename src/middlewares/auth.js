const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const auth = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ error: [{ msg: "No Token, Access Denied" }] });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: [{ msg: "Invalid access Token" }] });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: [{ msg: "Invalid Token" }] });
  }
};

module.exports = auth;
