
import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Complaint from "../models/Complaint.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

// Register Admin
export const registerAdmin = async (req, res) => {
  const { name, email, password, secretKey } = req.body;

  try {
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(401).json({ message: "Invalid Secret Key" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({ name, email, password: hashedPassword, secretKey });
    await admin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Admin Login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      token: generateToken(admin._id, "admin"),
      message: "Admin logged in successfully",
    });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: "Server error during login" });
  }
};

// Get All Complaints
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("userId", "name email") 
      .limit(100); 
    res.status(200).json(complaints);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: "Error fetching complaints" });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .limit(100); 
    res.status(200).json(users);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Get usr detail
export const getUserDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: "Error fetching user details" });
  }
};

// Update Complaint Status and Response (Remark)
export const updateComplaint = async (req, res) => {
  const { id } = req.params;
  const { status, response } = req.body;

  try {
    if (!["Resolved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status;
    complaint.response = response || ""; 
    await complaint.save();

    res.status(200).json({
      status: complaint.status,
      response: complaint.response,
      _id: complaint._id,
    });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: "Error updating complaint" });
  }
};


// Delete Complaint
export const deleteComplaint = async (req, res) => {
  const { id } = req.params;

  try {
    const complaint = await Complaint.findByIdAndDelete(id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (err) {
    console.error("Error deleting complaint:", err);

    res.status(500).json({ message: "Error deleting complaint" });
  }
};