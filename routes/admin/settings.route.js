const router = require('express').Router();
const { status } = require('http-status');
router.get('/settings', (req, res, next) => {
  try {
    res.status(status.OK).redirect('/admin/home');
    // res.status(status.OK).render('admin/settings', { activePage: 'settings' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
