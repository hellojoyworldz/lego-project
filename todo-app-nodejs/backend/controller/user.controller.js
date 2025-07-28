const User = require("../model/User");
const bcrypt = require("bcryptjs");

const saltRounds = 10;
const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw new Error("이미 존재하는 유저입니다.");
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
    res.status(400).json({ status: "fail", message: error.message });
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, "-__v -updatedAt -createdAt");

    if (user) {
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);

      if (isPasswordCorrect) {
        const token = await user.generateToken();
        res.status(200).json({ status: "success", data: user, token });
      } else {
        throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
      }
    } else {
      throw new Error("존재하지 않는 유저입니다. 회원가입을 해주세요.");
    }
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

module.exports = userController;
