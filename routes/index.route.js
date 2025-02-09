const router = require('express').Router();
const { status } = require('http-status');
const createCustomErrorMsg = require('../helpers/createCustomErrorMsg');
router.get('/', (req, res, next) => {
  try {
    res.status(status.OK).render('index', {
      title: 'First Express Static Example',
      description: 'This is an description for index page',
      keywords: 'All, home, page, keywords',
    });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.BAD_REQUEST,
    });
  }
});

module.exports = router;
