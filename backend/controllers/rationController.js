import User from "../models/User.js";

export const updateRation = async (req, res) => {
  try {
    const { rice, wheat, sugar } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send({ message: "User not found" });

    if (rice > user.quota.rice || wheat > user.quota.wheat || sugar > user.quota.sugar) {
      return res.status(400).send({ message: "Received quantity exceeds quota." });
    }

    user.rationDetails = { rice, wheat, sugar };
    const riceDifference = user.quota.rice - rice;
    const wheatDifference = user.quota.wheat - wheat;
    const sugarDifference = user.quota.sugar - sugar;

    user.rationHistory.push({ riceGiven: rice, wheatGiven: wheat, sugarGiven: sugar, riceDifference, wheatDifference, sugarDifference, date: new Date() });
    await user.save();

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

export const getRationHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ history: user.rationHistory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
