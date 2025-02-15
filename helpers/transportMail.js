const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${process.env.EMAIL}`,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const sendAccountVerifyEmail = async (to, verify_link) => {
  try {
    const mailOptions = {
      from: `no-replay:hidayah`,
      to: `${to}`,
      subject: 'Hidayah Admin Email Verification',
      text: `You must be verify your email: ${verify_link}`,
    };
    await transporter.sendMail(mailOptions);

    return true;
  } catch (error) {
    console.log('Mail Send Error::.', error);
    return false;
  }
};

const sendResetPasswordEmail = async (to, verify_link) => {
  try {
    const mailOptions = {
      from: `no-replay:hidayah`,
      to: `${to}`,
      subject: 'Hidayah Admin Email Verification',
      text: `You can reset your password at the following link: ${verify_link}`,
    };
    await transporter.sendMail(mailOptions);

    return true;
  } catch (error) {
    console.log('Mail Send Error::.', error);
    return false;
  }
};
module.exports = { sendAccountVerifyEmail, sendResetPasswordEmail };
