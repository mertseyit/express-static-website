const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: `${process.env.EMAIL_HOST}`,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const sendAccountVerifyEmail = async (to, verify_link) => {
  try {
    await transporter.sendMail({
      from: `noreplay:hidayah`,
      to: `${to}`,
      subject: 'Hidayah Admin Email Verification',
      text: `You must be verify your email: ${verify_link}`,
    });

    return true;
  } catch (error) {
    console.log('Mail Send Error::.', error);
    return false;
  }
};

module.exports = { sendAccountVerifyEmail };
