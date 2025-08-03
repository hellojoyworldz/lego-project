const { User, UserLevelTypeEnum } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { name, email, password, level } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      level: level ? level : UserLevelTypeEnum.CUSTOMER,
    });
    await newUser.save();

    return res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
};

userController.getUser = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("Invalid user");
    }

    return res.status(200).json({ status: "success", data: user });
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
};

module.exports = userController;
