// This middleware would be to authenticate the user of the website.

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protectRoutes = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get the authorization token from the user
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized Access" });
    }
  }
  if (!token) {
    res.status(401).json({
      message: "Not authorized, no token",
    });
  }
};

module.exports = {
  protectRoutes,
};
