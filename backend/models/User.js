
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  rationCardNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  familyMembers: { type: Number, required: true },
  password: { type: String, required: true },
  contactNumber: { 
    type: String, 
    required: true
  },
  quota: {
    rice: { type: Number, required: true },
    wheat: { type: Number, required: true },
    sugar: { type: Number, required: true }
  },
  rationDetails: {
    rice: { type: Number, default: 0 },
    wheat: { type: Number, default: 0 },
    sugar: { type: Number, default: 0 },
  },
  rationHistory: [{
    date: { type: Date, default: Date.now },
    riceGiven: { type: Number, required: true },
    wheatGiven: { type: Number, required: true },
    sugarGiven: { type: Number, required: true },
    riceDifference: { type: Number, required: true },
    wheatDifference: { type: Number, required: true },
    sugarDifference: { type: Number, required: true }
  }]
}, { timestamps: true });

// Method to recalculate quota
userSchema.methods.recalculateQuota = function() {
  this.quota.rice = this.familyMembers * 3;
  this.quota.wheat = this.familyMembers * 5;
  this.quota.sugar = this.familyMembers * 4;
};

const User = mongoose.model('User', userSchema);

export default User;
