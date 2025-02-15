const router = require('express').Router();
const { status } = require('http-status');
const Admin = require('../../models/Admin');
const createCustomErrorMsg = require('../../helpers/createCustomErrorMsg');
const uploadStorage = require('../../multer/storage');
const Token = require('../../models/Token');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const logActivityMiddlewre = require('../../middlewares/logActivityMiddleware');
const {
  sendAccountVerifyEmail,
  sendResetPasswordEmail,
} = require('../../helpers/transportMail');
router.get('/', async (req, res, next) => {
  try {
    const { id } = req.user;
    const existAdmin = await Admin.findOne({
      where: { id: id },
      attributes: { exclude: ['password'] },
    });

    if (!existAdmin) {
      return next({
        message: 'Admin Profile Not Found',
        status: status.NOT_FOUND,
      });
    }

    res.status(status.OK).render('admin/profile', {
      activePage: 'profile',
      profile: existAdmin,
    });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.INTERNAL_SERVER_ERROR,
    });
  }
});

router.patch(
  '/update/:id',
  logActivityMiddlewre,
  uploadStorage.none(),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { firstname, lastname } = req.body;
      if (!firstname || !lastname) {
        return res.status(status.BAD_REQUEST).json({
          message: 'Some parameters are missing',
          status: status.BAD_REQUEST,
        });
      }

      const existProfile = await Admin.findOne({
        where: { id: id },
        attributes: { exclude: ['password'] },
      });
      if (!existProfile) {
        return next({
          message: 'Admin profile not found',
          status: status.NOT_FOUND,
        });
      }

      await Admin.update(
        {
          firstname: firstname,
          lastname: lastname,
        },
        { where: { id: id } }
      );

      res.status(status.OK).json({
        message: 'Profile updated !',
        status: status.OK,
      });
    } catch (error) {
      res.status(status.INTERNAL_SERVER_ERROR).json({
        message: `${createCustomErrorMsg(error)}`,
        status: status.INTERNAL_SERVER_ERROR,
      });
    }
  }
);

router.patch(
  '/update-email/',
  logActivityMiddlewre,
  uploadStorage.none(),
  async (req, res, next) => {
    try {
      const { id } = req.user;
      const { email } = req.body;
      if (!email) {
        return res.status(status.BAD_REQUEST).json({
          message: 'Some parameters are missing',
          status: status.BAD_REQUEST,
        });
      }

      const existProfile = await Admin.findOne({
        where: { id: id },
        attributes: { exclude: ['password'] },
      });
      if (!existProfile) {
        return next({
          message: 'Admin profile not found',
          status: status.NOT_FOUND,
        });
      }

      if (
        existProfile.dataValues.email === email &&
        existProfile.dataValues.email_verified
      ) {
        return res.status(status.BAD_REQUEST).json({
          message: 'This email address is already in use and verified',
          status: status.BAD_REQUEST,
        });
      }

      await Admin.update(
        {
          email: email,
          email_verified: false,
        },
        { where: { id: id } }
      );
      var token = crypto.randomBytes(128).toString('hex');
      const findedAdminToken = await Token.findOne({ where: { admin_id: id } });
      if (!findedAdminToken) {
        return res.status(status.NOT_FOUND).json({
          message: 'Someting went wrong. Please try again later',
          status: status.NOT_FOUND,
        });
      }
      await Token.destroy({ where: { admin_id: id } });

      await Token.create({
        token: token,
        admin_id: id,
      });

      const success = await sendAccountVerifyEmail(
        `${email}`,
        `http://${process.env.API_HOST}:${process.env.API_PORT}/admin/auth/verified-email?token=${token}&id=${id}`
      );

      if (!success) {
        return res.status(status.BAD_REQUEST).json({
          message:
            'We have some problems for this event. Please try again later.',
          status: status.BAD_REQUEST,
        });
      }

      res.status(status.OK).json({
        message:
          'We send email verification link to your email. Please verify your email.',
        status: status.OK,
      });
    } catch (error) {
      console.error(error);
      res.status(status.INTERNAL_SERVER_ERROR).json({
        message: `${createCustomErrorMsg(error)}`,
        status: status.INTERNAL_SERVER_ERROR,
      });
    }
  }
);

router.post(
  '/send-update-password-request/',
  uploadStorage.none(),
  async (req, res, next) => {
    try {
      const { id } = req.user;

      const existProfile = await Admin.findOne({
        where: { id: id },
        attributes: { exclude: ['password'] },
      });
      if (!existProfile) {
        return next({
          message: 'Admin profile not found',
          status: status.NOT_FOUND,
        });
      }

      const token = crypto.randomBytes(128).toString('hex');

      await Admin.update(
        {
          resetpasswordtoken: token,
          resetpasswordtokenexp: new Date(Date.now() + 2 * 60 * 1000), // 1 dakika ekleme
        },
        { where: { id: id } }
      );

      const success = await sendResetPasswordEmail(
        `${existProfile.dataValues.email}`,
        `http://${process.env.API_HOST}:${process.env.API_PORT}/admin/profile/update-password-request?token=${token}`
      );

      if (!success) {
        return res.status(status.BAD_REQUEST).json({
          message:
            'We have some problems for this event. Please try again later.',
          status: status.BAD_REQUEST,
        });
      }

      res.status(status.OK).json({
        message:
          'We send email verification link to your email. Please verify your email.',
        status: status.OK,
      });
    } catch (error) {
      console.error(error);
      res.status(status.INTERNAL_SERVER_ERROR).json({
        message: `${createCustomErrorMsg(error)}`,
        status: status.INTERNAL_SERVER_ERROR,
      });
    }
  }
);

router.get('/update-password-request', async (req, res, next) => {
  try {
    const { token } = req.query;
    const { id } = req.user;

    const currentAdmin = await Admin.findOne({
      where: { id: id },
      attributes: { exclude: ['password'] },
    });
    if (!currentAdmin) {
      return next({
        message: 'Admin not found',
        status: status.NOT_FOUND,
      });
    }
    if (token !== currentAdmin.dataValues.resetpasswordtoken) {
      return next({
        message: 'Invalid password reset link',
        status: status.NOT_FOUND,
      });
    }

    if (new Date(currentAdmin.dataValues.resetpasswordtokenexp) < new Date()) {
      return next({
        message: 'Reset link expired. Please resend again later',
        status: status.BAD_REQUEST,
      });
    }

    res.status(status.OK).render('admin/update-password-request', {
      resetpasswordtokenexp: currentAdmin.dataValues.resetpasswordtokenexp,
    });
  } catch (error) {
    console.error(error);
    res.status(status.INTERNAL_SERVER_ERROR).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.INTERNAL_SERVER_ERROR,
    });
  }
});

router.patch(
  '/update-password-request',
  logActivityMiddlewre,
  uploadStorage.none(),
  async (req, res, next) => {
    try {
      const { id } = req.user;
      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) {
        return res.status(status.BAD_REQUEST).json({
          message: 'Some parameters are missing',
          status: status.BAD_REQUEST,
        });
      }

      const admin = await Admin.findOne({ where: { id: id } });
      if (!admin) {
        return next({
          message: 'Admin not found',
          status: status.NOT_FOUND,
        });
      }

      const confirmPassword = await bcrypt.compare(
        currentPassword,
        admin.dataValues.password
      );
      if (!confirmPassword) {
        return res.status(status.UNAUTHORIZED).json({
          message: 'Current password incorrect',
          status: status.UNAUTHORIZED,
        });
      }

      await Admin.update(
        {
          resetpasswordtoken: null,
          resetpasswordtokenexp: new Date(),
          password: newPassword,
        },
        { where: { id: id }, individualHooks: true }
      );
      res.clearCookie('token');
      res.status(status.OK).json({
        message: 'Password Reset',
        status: status.OK,
      });
    } catch (error) {
      console.error(error);
      res.status(status.INTERNAL_SERVER_ERROR).json({
        message: `${createCustomErrorMsg(error)}`,
        status: status.INTERNAL_SERVER_ERROR,
      });
    }
  }
);

module.exports = router;
