const sgMail = require('@sendgrid/mail');

// Initialize SendGrid SDK once at startup.
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

module.exports = sgMail;
