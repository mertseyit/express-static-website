const router = require('express').Router();
const { status } = require('http-status');
const createCustomErrorMsg = require('../helpers/createCustomErrorMsg');
const Blog = require('../models/Blog');
router.get('/blogs', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll();
    res.status(status.OK).render('blog', {
      title: 'First Express Static Example',
      description: 'This is an description for blog page',
      keywords: 'All, blog, keywords',
      pageHeader: 'Blog',
      blogs: blogs,
    });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.BAD_REQUEST,
    });
  }
});

router.get('/blogs/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findOne({ where: { id: id } });
    if (!blog) {
      return next({
        message: 'Blog not founded',
        status: status.NOT_FOUND,
      });
    }
    res.status(status.OK).render('blog_detail', {
      title: 'First Express Static Example',
      description: 'This is an description for blog page',
      keywords: 'All, blog, keywords',
      pageHeader: `${blog.dataValues.blog_title}`,
      blog: blog,
    });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.BAD_REQUEST,
    });
  }
});

module.exports = router;
