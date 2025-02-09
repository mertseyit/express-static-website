const router = require('express').Router();
const { status } = require('http-status');

router.get('/verify-email', (req, res, next) => {
  try {
    res.status(status.OK).render('admin/verify-email');
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      message: `${error.message} `,
      status: status.INTERNAL_SERVER_ERROR,
    });
  }
});

router.get('/verified-email', (req, res, next) => {
  try {
    const { token } = req.query;
    console.log(token);
    res.status(status.OK).render('admin/email-verified');
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      message: `${error.message} `,
      status: status.INTERNAL_SERVER_ERROR,
    });
  }
});

module.exports = router;
