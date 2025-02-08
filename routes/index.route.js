const router = require('express').Router();
const { status } = require('http-status');
router.get('/', (req, res, next) => {
  try {
    res.status(status.OK).render('index', {
      title: 'First Express Static Example',
      description: 'This is an description for index page',
      keywords: 'All, home, page, keywords',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
