const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserLevelTypeEnum } = require("../models/User");
require("dotenv").config();
const authController = {};

authController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        const token = await user.generateToken();
        return res.status(200).json({ status: "success", data: user, token });
      } else {
        throw new Error("Invalid password");
      }
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
};

authController.loginWithGoogle = async (req, res) => {
  try {
    const { token } = req.body;
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
};

authController.authenticate = async (req, res, next) => {
  try {
    const tokenString = req.headers["authorization"];

    if (!tokenString) {
      throw new Error("token not found");
    }

    const token = tokenString.replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
      if (error) {
        throw new Error("invalid token");
      }
      req.userId = payload._id;
    });

    next();
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
};

authController.checkAdminPermission = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);

    if (user.level !== UserLevelTypeEnum.ADMIN) {
      throw new Error("user is not admin");
    }

    next();
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
};

module.exports = authController;
