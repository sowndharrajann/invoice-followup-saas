const sgMail = require('../config/sendgrid');

// Send reminder email to a client.
async function sendReminderEmail({ to, clientName, amount, dueDate, reminderType }) {
  if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM_EMAIL) {
    console.warn('SendGrid configuration missing; skipping email delivery.');
    return;
  }

  const subjects = {
    before_due: 'Friendly reminder: Invoice due in 3 days',
    due_today: 'Invoice due today',
    overdue: 'Invoice payment overdue',
  };

  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: subjects[reminderType] || 'Invoice payment reminder',
    text: `Hi ${clientName},\n\nThis is a ${reminderType.replace('_', ' ')} reminder for your invoice of $${amount}. Due date: ${new Date(dueDate).toDateString()}.\n\nThank you.`,
  };

  await sgMail.send(msg);
}

module.exports = { sendReminderEmail };
