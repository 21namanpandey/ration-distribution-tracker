import User from "../models/User.js";

export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, familyMembers, contactNumber } = req.body;
    if (!name || !familyMembers || !contactNumber) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found." });

    if (user.familyMembers !== familyMembers) {
      user.familyMembers = familyMembers;
      user.recalculateQuota();
    }

    user.name = name;
    user.contactNumber = contactNumber;
    await user.save();

    res.status(200).json({ message: "Profile updated successfully.", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { name: 1, rationCardNumber: 1, _id: 0 });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};