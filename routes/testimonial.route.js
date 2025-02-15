const router = require('express').Router();
const { status } = require('http-status');
const createCustomErrorMsg = require('../helpers/createCustomErrorMsg');
const Testimonial = require('../models/Testimonial');
router.get('/testimonials', async (req, res, next) => {
  try {
    const testimonials = await Testimonial.findAll();
    res.status(status.OK).render('testimonials', {
      title: 'First Express Static Example',
      description: 'This is an description for testimonials page',
      keywords: 'All, testimonials, keywords',
      pageHeader: 'Testimonials',
      testimonials: testimonials,
    });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.BAD_REQUEST,
    });
  }
});

module.exports = router;
