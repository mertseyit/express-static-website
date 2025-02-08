const router = require('express').Router();
const { status } = require('http-status');
router.get('/services', (req, res, next) => {
  try {
    res.status(status.OK).render('services', {
      title: 'First Express Static Example',
      description: 'This is an description for services page',
      keywords: 'All, services, keywords',
      pageHeader: 'Services',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
