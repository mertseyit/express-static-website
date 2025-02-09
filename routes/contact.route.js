const router = require('express').Router();
const { status } = require('http-status');
const UserFeedback = require('../models/UserFeedback');
const createCustomErrorMsg = require('../helpers/createCustomErrorMsg');
router.get('/contact', (req, res, next) => {
  //global error handling test
  if (req.query.id == '1') {
    throw new Error('Unexpected error');
  }
  try {
    res.status(status.OK).render('contact', {
      title: 'First Express Static Example',
      description: 'This is an description for contact page',
      keywords: 'All, contact, keywords',
      pageHeader: 'Contact',
    });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.BAD_REQUEST,
    });
  }
});

router.post('/send-feedback', async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      req.flash('error', 'Please fill in all fields correctly');
      res.redirect('/contact');
      return;
    }
    await UserFeedback.create({
      name: name,
      email: email,
      subject: subject,
      message: message,
    });
    req.flash('success', 'Form Submited');
    res.redirect('/contact');
  } catch (error) {
    req.flash('error', 'Please fill in all fields correctly');
    next(error);
  }
});

module.exports = router;
