const router = require('express').Router();
const { status } = require('http-status');
const createCustomErrorMsg = require('../helpers/createCustomErrorMsg');
router.get('/portfolio', (req, res, next) => {
  try {
    res.status(status.OK).render('portfolio', {
      title: 'First Express Static Example',
      description: 'This is an description for portfolio page',
      keywords: 'All, portfolio, keywords',
      pageHeader: 'Portfolio',
    });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.BAD_REQUEST,
    });
  }
});

module.exports = router;
