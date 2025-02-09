const router = require('express').Router();
const { status } = require('http-status');
const createCustomErrorMsg = require('../../helpers/createCustomErrorMsg');
router.get('/', (req, res, next) => {
  try {
    res.status(status.OK).render('admin/index', { activePage: 'index' });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.BAD_REQUEST,
    });
  }
});

module.exports = router;
