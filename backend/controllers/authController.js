import User from "../models/User.js";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import {generateToken} from "../utils/generateToken.js"

// Register a new user
export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Generate JWT token
    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });
    const token = generateToken(user._id)

    res.status(201).json({ message: "User created successfully!", token });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Generate JWT token
    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });
    const token = generateToken(user._id)

    res.status(200).json({ message: "Login successful!", token,
      user: {
        name: user.name,
        email: user.email,
        userId: user._id,
      },
     });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
