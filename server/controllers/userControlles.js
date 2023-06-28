const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcryptjs");

/// Register New User ///
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ msg: "Please provide all the required fields" });
  }
  // if user already exist //
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ msg: "User already exists..." });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(500).json({ msg: "user not created..." });
  }
});

// login | auth user //
const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ msg: "Please provide all the required fields" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ msg: "Check your email or password..." });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ msg: "Check your email or password..." });
  }
  if (user && isMatch) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    return res.status(500).json({ msg: "Error occured..." });
  }
});

const getUserDetails = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ msg: "Provide valid input" });
  }
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(400).json({ msg: "no user found" });
  }
  if (user) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    return res.status(400).json({ msg: "not user" });
  }
});

const getAllUserDetails = asyncHandler(async (req, res) => {
  const users = await User.find({}).select({ name: 1, _id: 1, email: 1 });
  if (!users) {
    return res.status(200).json({ msg: "error", users: [] });
  }
  return res.status(200).json({ msg: "success", users: users });
});

module.exports = { registerUser, authUser, getUserDetails, getAllUserDetails };
