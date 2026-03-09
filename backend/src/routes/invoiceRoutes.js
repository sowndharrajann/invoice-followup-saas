const express = require('express');
const auth = require('../middleware/auth');
const {
  createInvoice,
  listInvoices,
  markInvoicePaid,
  dashboard,
} = require('../controllers/invoiceController');

const router = express.Router();

router.use(auth);
router.get('/dashboard', dashboard);
router.get('/invoices', listInvoices);
router.post('/invoices', createInvoice);
router.patch('/invoices/:id/pay', markInvoicePaid);

module.exports = router;
