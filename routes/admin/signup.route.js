const router = require('express').Router();
const { status } = require('http-status');
const uploadStorage = require('../../multer/storage');
const Admin = require('../../models/Admin');
const { sendAccountVerifyEmail } = require('../../helpers/transportMail');
const crypto = require('crypto');
const Token = require('../../models/Token');

router.get('/', (req, res, next) => {
  try {
    res.status(status.OK).render('admin/signup');
  } catch (error) {
    next(error);
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

    await Admin.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      email_verified: false,
    });

    var token = crypto.randomBytes(128).toString('hex');

    await Token.create({
      token: token,
    });
    const success = await sendAccountVerifyEmail(
      `http://${process.env.API_HOST}:${process.env.API_PORT}/admin/auth/verified-email?token=${token}`
    );
    if (success) {
      res.status(status.OK).redirect('admin/verify-email');
    } else {
      res.status(status.BAD_REQUEST).json({
        message: 'Account failed to create',
        status: status.BAD_REQUEST,
      });
    }
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      message: `${error.message}`,
      status: status.INTERNAL_SERVER_ERROR,
    });
  }
});

module.exports = router;
