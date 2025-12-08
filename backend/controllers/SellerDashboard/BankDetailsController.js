const BankAccount = require('../../models/Sellermodel/BankDetailsModel');

exports.createBankAccount = async (req, res) => {
  try {
    const {
      accountType,
      accountHolderName,
      accountNumber,
      confirmAccountNumber,
      ifscCode,
      numberLinked,
      ownerId
    } = req.body;

    if (!accountType || !accountHolderName || !accountNumber || !confirmAccountNumber || !ifscCode || !numberLinked) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (accountNumber.trim() !== confirmAccountNumber.trim()) {
      return res.status(422).json({ message: 'Account numbers do not match' });
    }

    const exists = await BankAccount.findOne({ accountNumber: accountNumber.trim() });
    if (exists) {
      return res.status(409).json({ message: 'Account number already exists' });
    }

    const doc = await BankAccount.create({
      accountType: accountType.trim(),
      accountHolderName: accountHolderName.trim(),
      accountNumber: accountNumber.trim(),
      ifscCode: ifscCode.trim(),
      numberLinked: numberLinked.trim(),
      ownerId: ownerId || undefined
    });

    return res.status(201).json(doc);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Duplicate account number', error: err.keyValue });
    }
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getBankAccounts = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1'));
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit || '50')));
    const skip = (page - 1) * limit;
    const q = (req.query.q || '').trim();

    const filter = q
      ? {
          $or: [
            { accountHolderName: new RegExp(q, 'i') },
            { accountType: new RegExp(q, 'i') },
            { ifscCode: new RegExp(q, 'i') },
            { accountNumber: new RegExp(q, 'i') }
          ]
        }
      : {};

    const [items, total] = await Promise.all([
      BankAccount.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      BankAccount.countDocuments(filter)
    ]);

    return res.json({ page, limit, total, count: items.length, items });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getBankAccountById = async (req, res) => {
  try {
    const doc = await BankAccount.findById(req.params.id).lean();
    if (!doc) return res.status(404).json({ message: 'Bank account not found' });
    return res.json(doc);
  } catch (err) {
    if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid ID' });
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
