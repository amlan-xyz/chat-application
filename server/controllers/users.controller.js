import bcrypt from "bcrypt";
import validator from "validator";
import User from "../models/users.model.js";
import { createToken } from "../utils/jwt.utils.js";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, username, avatar } = req.body;
    const duplicateUserEmail = await User.findOne({ email });
    const duplicateUsername = await User.findOne({ username });

    if (duplicateUserEmail)
      return res.status(400).json({ message: "User already exists" });

    if (duplicateUsername)
      return res.status(400).json({ message: "Username already taken" });

    if (!name || !email || !password || !username)
      return res.status(400).json({ message: "All fields are required" });

    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Invalid Email" });

    const user = new User({ name, email, password, username, avatar });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const token = createToken(user._id);

    res.status(200).json({
      message: "Signup successful",
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Invalid user name" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = createToken(user._id);
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const findUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id, ["name", "username", "avatar"]);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User found",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, ["name", "username", "avatar"]);
    res.status(200).json({ message: "Users found", users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUserById = async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await User.findById(userId, ["name", "username", "avatar"]);
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateAvatarById = async (req, res) => {
  const { userId } = req.user;
  const { newAvatar } = req.body;

  try {
    const user = await User.findById(userId);
    user.avatar = newAvatar;
    await user.save();
    res.status(200).json({
      message: "Avatar updated",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
