const mongoose = require('mongoose');

const BankDetailsSchema = new mongoose.Schema(
  {
    accountType: { type: String, required: true, trim: true },
    accountHolderName: { type: String, required: true, trim: true },
    accountNumber: { type: String, required: true, trim: true, unique: true },
    ifscCode: { type: String, required: true, trim: true },
    numberLinked: { type: String, required: true, trim: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('BankAccount', BankDetailsSchema);
