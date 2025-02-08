const router = require('express').Router();
const { status } = require('http-status');
router.get('/about', (req, res, next) => {
  try {
    res.status(status.OK).render('about', {
      title: 'First Express Static Example',
      description: 'This is an description for about page',
      keywords: 'All, about, keywords',
      pageHeader: 'About Us',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
