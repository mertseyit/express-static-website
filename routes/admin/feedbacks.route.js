const router = require('express').Router();
const { status } = require('http-status');
const createCustomErrorMsg = require('../../helpers/createCustomErrorMsg');
router.get('/', (req, res, next) => {
  try {
    res
      .status(status.OK)
      .render('admin/feedbacks', { activePage: 'feedbacks' });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.BAD_REQUEST,
    });
  }
});

router.get('/add', (req, res, next) => {
  try {
    res
      .status(status.OK)
      .render('admin/add_feedback', { activePage: 'feedbacks' });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.BAD_REQUEST,
    });
  }
});
module.exports = router;
