const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendMail({ to, subject, message }) {
  try {
    const msg = {
      to: to,
      from: process.env.SEND_FROM,
      subject: subject,
      text: message,
    };

    console.log('Enviando email de activación a', to);
    await sendgrid.send(msg);
  } catch (error) {
    console.error(error);

    throw new Error('Error enviando mail');
  }
}

module.exports = sendMail;
