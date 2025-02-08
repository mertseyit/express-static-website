const router = require('express').Router();
const { status } = require('http-status');
router.get('/', (req, res, next) => {
  try {
    res.status(status.OK).render('admin/signin');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
