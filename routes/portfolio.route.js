const router = require('express').Router();
const { status } = require('http-status');
router.get('/portfolio', (req, res, next) => {
  try {
    res.status(status.OK).render('portfolio', {
      title: 'First Express Static Example',
      description: 'This is an description for portfolio page',
      keywords: 'All, portfolio, keywords',
      pageHeader: 'Portfolio',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
