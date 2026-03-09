const pool = require('../config/db');
const { getDashboardStats } = require('../services/invoiceService');

// Create a new invoice for current user.
async function createInvoice(req, res) {
  const { clientName, clientEmail, amount, dueDate } = req.body;

  if (!clientName || !clientEmail || !amount || !dueDate) {
    return res.status(400).json({ message: 'All invoice fields are required.' });
  }

  const result = await pool.query(
    `INSERT INTO invoices (user_id, client_name, client_email, amount, due_date)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [req.user.id, clientName, clientEmail, amount, dueDate]
  );

  return res.status(201).json(result.rows[0]);
}

// Get invoices for current user.
async function listInvoices(req, res) {
  const result = await pool.query(
    'SELECT * FROM invoices WHERE user_id = $1 ORDER BY due_date ASC',
    [req.user.id]
  );

  return res.json(result.rows);
}

// Mark invoice as paid.
async function markInvoicePaid(req, res) {
  const { id } = req.params;
  const result = await pool.query(
    `UPDATE invoices
     SET status = 'paid', paid_at = NOW(), updated_at = NOW()
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [id, req.user.id]
  );

  if (!result.rows.length) {
    return res.status(404).json({ message: 'Invoice not found.' });
  }

  return res.json(result.rows[0]);
}

// Dashboard summary endpoint.
async function dashboard(req, res) {
  const stats = await getDashboardStats(req.user.id);
  return res.json(stats);
}

module.exports = { createInvoice, listInvoices, markInvoicePaid, dashboard };
