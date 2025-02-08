const router = require('express').Router();
const { status } = require('http-status');
router.get('/team', (req, res, next) => {
  try {
    res.status(status.OK).render('team', {
      title: 'First Express Static Example',
      description: 'This is an description for team page',
      keywords: 'All, team, keywords',
      pageHeader: 'Our Team',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
