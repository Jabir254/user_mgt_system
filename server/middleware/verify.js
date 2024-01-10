// verify the session exists

const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

exports.Verify = async function (req, res, next) {
  try {
    const authHeader = req.headers["cookie"];
    if (!authHeader) return res.sendStatus(401);
    const cookie = authHeader.split("=")[1];
    const accessToken = cookie.split(";")[0];
    const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken }); // Check if that token is blacklisted
    // if true, send an unathorized message, asking for a re-authentication.
    if (checkIfBlacklisted)
      return res
        .status(401)
        .json({ message: "This session has expired. Please login" });

    jwt.verify(cookie, `${process.env.jwtSecret}`, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "This session has expired" });
      }
      const { id } = decoded;
      const user = await Admin.findById(id);
      const { password, ...data } = user._doc;
      req.user = data;
      next();
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal Server Error",
    });
  }
};
exports.verifyRole = function (req, res, next) {
  try {
    const user = req.user; // we have access to the user object from the request
    const { role } = user; // extract the user role
    // check if user has no advance privileges
    // return an unathorized response
    if (role !== "0x88") {
      return res.status(401).json({
        status: "failed",
        message: "You are not authorized to view this page.",
      });
    }
    next(); // continue to the next middleware or function
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal Server Error",
    });
  }
};
