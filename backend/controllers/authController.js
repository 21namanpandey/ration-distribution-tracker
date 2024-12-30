import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import config from "../config.js";

// Register
export const registerUser = async (req, res) => {
  try {
    const { rationCardNumber, name, familyMembers, password, contactNumber, quota } = req.body;
    const existingUser = await User.findOne({ rationCardNumber });
    if (existingUser) return res.status(400).send({ message: "Ration card number already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      rationCardNumber,
      name,
      familyMembers,
      password: hashedPassword,
      contactNumber,
      quota: quota || { rice: familyMembers * 3, wheat: familyMembers * 5, sugar: familyMembers * 4 },
    });

    await newUser.save();
    res.send({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { rationCardNumber, password } = req.body;
    const user = await User.findOne({ rationCardNumber });
    if (!user) return res.status(404).send({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).send({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: "1d" });
    res.send({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
