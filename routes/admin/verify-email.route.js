const router = require('express').Router();
const { status } = require('http-status');
const createCustomErrorMsg = require('../../helpers/createCustomErrorMsg');
const Token = require('../../models/Token');
const Admin = require('../../models/Admin');

router.get('/verify-email', (req, res, next) => {
  try {
    res.status(status.OK).render('admin/verify-email');
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.BAD_REQUEST,
    });
  }
});

router.get('/verified-email', async (req, res, next) => {
  try {
    const { token, id } = req.query;
    if (!token || !id)
      return res
        .status(status.OK)
        .render('admin/email-verified', { msg: 'Invalid verification link' });

    const existToken = await Token.findOne({
      where: { token: token, admin_id: id },
    });

    if (!existToken)
      res
        .status(status.OK)
        .render('admin/email-verified', { msg: 'Invalid verification link' });
    const admin = await Admin.findOne({ where: { id: id } });

    if (admin.dataValues.email_verified)
      return res.status(status.OK).render('admin/email-verified', {
        msg: 'Your email already verified. Go to signin page',
      });

    await Admin.update({ email_verified: true }, { where: { id: id } });

    res.status(status.OK).render('admin/email-verified', {
      msg: 'Your email verified. Go to login page',
    });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.BAD_REQUEST,
    });
  }
});

module.exports = router;
