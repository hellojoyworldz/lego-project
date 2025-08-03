const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
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

module.exports = authController;
