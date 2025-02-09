const router = require('express').Router();
const { status } = require('http-status');
const createCustomErrorMsg = require('../../helpers/createCustomErrorMsg');
router.get('/settings', (req, res, next) => {
  try {
    res.status(status.OK).redirect('/admin/home');
    // res.status(status.OK).render('admin/settings', { activePage: 'settings' });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.BAD_REQUEST,
    });
  }
});

module.exports = router;
