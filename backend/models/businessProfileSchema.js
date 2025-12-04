const mongoose = require("mongoose");
const businessProfileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    companyName: String,
    faxNumber: String,
    officeContactCode: String,
    officeContactNumber: String,
    ownershipType: String,
    currency: String,
    annualTurnover: String,
    yearOfEstablishment: String,
    numberOfEmployees: String,
    address: String,
    pincode: String,
    city: String,
    state: String,
    country: String,
    gstNumber: String,
    aadhaarNumber: String,
    panNumber: String,
    iecNumber: String,
    tanNumber: String,
    vatNumber: String,
  },
  { timestamps: true }
);
const BusinessProfile = mongoose.model(
  "BusinessProfile",
  businessProfileSchema
);