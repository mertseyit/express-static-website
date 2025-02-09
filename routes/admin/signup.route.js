const router = require('express').Router();
const { status } = require('http-status');
const uploadStorage = require('../../multer/storage');
const Admin = require('../../models/Admin');
const { sendAccountVerifyEmail } = require('../../helpers/transportMail');
const crypto = require('crypto');
const Token = require('../../models/Token');
const createCustomErrorMsg = require('../../helpers/createCustomErrorMsg');

router.get('/', (req, res, next) => {
  try {
    res.status(status.OK).render('admin/signup');
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.BAD_REQUEST,
    });
  }
});

router.post('/', uploadStorage.none(), async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, confirmPassword } = req.body;
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      return res.status(status.BAD_REQUEST).json({
        message: 'Some parameters missing',
        status: status.BAD_REQUEST,
      });
    }

    if (confirmPassword !== password) {
      return res.status(status.BAD_REQUEST).json({
        message: "Passwords don't match",
        status: status.BAD_REQUEST,
      });
    }

    var token = crypto.randomBytes(128).toString('hex');
    const user = await Admin.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      email_verified: false,
    });

    await Token.create({
      token: token,
      admin_id: user.dataValues.id,
    });

    const success = await sendAccountVerifyEmail(
      `${email}`,
      `http://${process.env.API_HOST}:${process.env.API_PORT}/admin/auth/verified-email?token=${token}&id=${user.dataValues.id}`
    );

    if (success) {
      res.status(status.OK).json({
        message: 'We send email verification link to your email.',
        status: status.OK,
      });
    } else {
      res.status(status.BAD_REQUEST).json({
        message: 'Account failed to create',
        status: status.BAD_REQUEST,
      });
    }
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.INTERNAL_SERVER_ERROR,
    });
  }
});

module.exports = router;
