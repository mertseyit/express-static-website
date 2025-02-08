const router = require('express').Router();
const { status } = require('http-status');
router.get('/', (req, res, next) => {
  try {
    res.status(status.OK).render('admin/signup');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
