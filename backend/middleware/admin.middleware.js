// middleware/admin.middleware.js
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log("Token:", token);

    if (!token) {
      return res.status(403).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);
    req.user = await User.findById(decoded._id);

    if (!req.user) {
      return res.status(401).json({ message: "Invalid token." });
    }

    next();
  } catch (error) {
    console.log("Error:", error);

    // Check if the error is due to token expiration
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token has expired." });
    }

    res.status(401).json({ message: "Invalid token." });
  }
};

const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate." });
  }
};

export default adminMiddleware;
