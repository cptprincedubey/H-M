const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    let { name, email, phone, password } = req.body;
    
    const existingUser = await UserModel.findOne({ email });

    console.log("exists--->", existingUser);

    if (existingUser)
      return res.status(400).json({
        message: "user already registered",
      });

    const newUser = await UserModel.create({
      name,
      email,
      phone,
      password,
    });

    let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token);

    return res.status(201).json({
      message: "user registered",
      user: newUser,
    });
  } catch (error) {
    console.log("error in reg->", error);
    return res.status(500).json({
      message: "internal server error",
      error: error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res.status(422).json({
        message: "Email and password Required",
      });

    const user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    let cp = user.comparePass(password);

    if (!cp)
      return res.status(400).json({
        message: "incorrect email and password",
      });

    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token);

    return res.status(200).json({
      message: "User logged in",
      user: user,
    });
  } catch (error) {
    console.log("error in login->", error);
    return res.status(500).json({
      message: "internal server error",
      error: error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
