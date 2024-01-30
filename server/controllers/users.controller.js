import bcrypt from "bcrypt";
import validator from "validator";
import User from "../models/users.model.js";
import { createToken } from "../utils/jwt.utils.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;
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

    const user = new User({ name, email, password, username });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const token = createToken(user._id);

    res.status(200).json({
      message: "Signup successful",
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
