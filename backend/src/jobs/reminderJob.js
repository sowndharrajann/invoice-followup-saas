const cron = require('node-cron');
const pool = require('../config/db');
const { sendReminderEmail } = require('../services/emailService');

// Daily reminder job for before due, due today, and overdue checkpoints.
function startReminderJob() {
  cron.schedule('0 8 * * *', async () => {
    try {
      const result = await pool.query(
        `SELECT * FROM invoices
         WHERE status = 'pending'
           AND (
             due_date = CURRENT_DATE + INTERVAL '3 days'
             OR due_date = CURRENT_DATE
             OR due_date = CURRENT_DATE - INTERVAL '3 days'
           )`
      );

      for (const invoice of result.rows) {
        let reminderType = 'due_today';
        if (new Date(invoice.due_date) > new Date(new Date().toDateString())) {
          reminderType = 'before_due';
        } else if (new Date(invoice.due_date) < new Date(new Date().toDateString())) {
          reminderType = 'overdue';
        }

        await sendReminderEmail({
          to: invoice.client_email,
          clientName: invoice.client_name,
          amount: invoice.amount,
          dueDate: invoice.due_date,
          reminderType,
        });
      }

      console.log(`Reminder job processed ${result.rows.length} invoice(s).`);
    } catch (error) {
      console.error('Reminder job failed:', error.message);
    }
  });
}

module.exports = { startReminderJob };
