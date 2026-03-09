const pool = require('../config/db');

// Get aggregated dashboard metrics for a user.
async function getDashboardStats(userId) {
  const result = await pool.query(
    `SELECT
      COUNT(*)::int AS total_invoices,
      COUNT(*) FILTER (WHERE status = 'paid')::int AS paid_invoices,
      COUNT(*) FILTER (WHERE status = 'pending' AND due_date < CURRENT_DATE)::int AS overdue_invoices
    FROM invoices
    WHERE user_id = $1`,
    [userId]
  );

  return result.rows[0];
}

module.exports = { getDashboardStats };
