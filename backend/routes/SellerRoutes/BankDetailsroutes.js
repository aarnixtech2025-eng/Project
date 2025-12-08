const express = require('express');
const router = express.Router();
const controller = require('../../controllers/SellerDashboard/BankDetailsController');

router.post('/', controller.createBankAccount);

router.get('/', controller.getBankAccounts);

router.get('/:id', controller.getBankAccountById);

module.exports = router;
