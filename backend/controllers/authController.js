const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const user = await User.create({
      email,
      fullName,
      password,
      profileImageUrl,
    });

    res
      .status(201)
      .json({ id: user._id, user, token: generateToken(user._id) });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });
  try {
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    res
      .status(200)
      .json({ id: user._id, user, token: generateToken(user._id) });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while logging user", error: error.message });
  }
};
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error to get user information", error: error.message });
  }
};

exports.updateUserDetails = async (req, res) => {
  const { updatedIcon, updatedPassword, updatedName } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (updatedName !== "") {
      user.fullName = updatedName;
    }

    if (updatedIcon !== "") {
      user.profileImageUrl = updatedIcon;
    }

    if (updatedPassword !== "") {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(updatedPassword, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: "User details updated successfully",
      user: {
        id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        profileImageUrl: updatedUser.profileImageUrl,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user details",
      error: error.message,
    });
  }
};
