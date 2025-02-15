const router = require('express').Router();
const { status } = require('http-status');
const createCustomErrorMsg = require('../helpers/createCustomErrorMsg');
const Portfolio = require('../models/Portfolio');
router.get('/portfolio', async (req, res, next) => {
  try {
    const portfolios = await Portfolio.findAll();
    res.status(status.OK).render('portfolio', {
      title: 'First Express Static Example',
      description: 'This is an description for portfolio page',
      keywords: 'All, portfolio, keywords',
      pageHeader: 'Portfolio',
      portfolios: portfolios,
    });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.BAD_REQUEST,
    });
  }
});

module.exports = router;
