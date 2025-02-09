const router = require('express').Router();
const { status } = require('http-status');
const createCustomErrorMsg = require('../helpers/createCustomErrorMsg');
router.get('/services', (req, res, next) => {
  try {
    res.status(status.OK).render('services', {
      title: 'First Express Static Example',
      description: 'This is an description for services page',
      keywords: 'All, services, keywords',
      pageHeader: 'Services',
    });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.BAD_REQUEST,
    });
  }
});

module.exports = router;
