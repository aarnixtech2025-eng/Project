const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName:  { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    officeContact: { type: String, required: true, trim: true },

    alternateMobileNumber: { type: String, trim: true, default: "" },

    whatsappNumber: { type: String, trim: true, default: "" },

    designation: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserProfile", UserProfileSchema);
