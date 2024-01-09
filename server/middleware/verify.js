// verify the session exists

const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

exports.Verify = async function (req, res, next) {
  try {
    const authHeader = req.headers["cookie"];
    if (!authHeader) return res.sendStatus(401);
    const cookie = authHeader.split("=")[1];

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
