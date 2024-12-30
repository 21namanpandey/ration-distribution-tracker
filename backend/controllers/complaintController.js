import Complaint from "../models/Complaint.js";
import User from "../models/User.js";

// Submit a Complaint
export const submitComplaint = async (req, res) => {
  const { rationCardNumber, type, description } = req.body;

  try {
    const user = await User.findOne({ rationCardNumber });
    if (!user) return res.status(404).json({ error: "User not found" });

    const complaint = new Complaint({
      rationCardNumber,
      userId: user._id,
      type,
      description,
    });

    await complaint.save();
    res.status(201).json({ message: "Complaint submitted successfully", complaint });
  } catch (error) {
    console.error("Error submitting complaint:", error);
    res.status(500).json({ error: "Failed to submit complaint" });
  }
};

// Get Complaints for a User
export const getComplaintsForUser = async (req, res) => {
  const { rationCardNumber } = req.params;

  try {
    const complaints = await Complaint.find({ rationCardNumber });
    res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
};

// Admin: Update Complaint Status
export const updateComplaintStatus = async (req, res) => {
  const { id } = req.params;
  const { status, response } = req.body;

  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) return res.status(404).json({ error: "Complaint not found" });

    complaint.status = status || complaint.status;
    complaint.response = response || complaint.response;

    await complaint.save();
    res.status(200).json({ message: "Complaint updated successfully", complaint });
  } catch (error) {
    console.error("Error updating complaint:", error);
    res.status(500).json({ error: "Failed to update complaint" });
  }
};
