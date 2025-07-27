const User = require("../model/User");
const bcrypt = require("bcryptjs");

const saltRounds = 10;
const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({ status: "success", data: newUser });
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
};

userController.loginWidthEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, "-__v -updatedAt -createdAt");

    if (user) {
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);

      if (isPasswordCorrect) {
        const token = await user.generateToken();
        res.status(200).json({ status: "success", data: user, token });
      }
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
};

module.exports = userController;
