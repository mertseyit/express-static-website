const router = require('express').Router();
const { status } = require('http-status');
router.get('/', (req, res, next) => {
  try {
    res
      .status(status.OK)
      .render('admin/portfolios', { activePage: 'portfolios' });
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res, next) => {
  try {
    res
      .status(status.OK)
      .render('admin/add_portfolio', { activePage: 'portfolios' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
