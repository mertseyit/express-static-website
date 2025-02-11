const router = require('express').Router();
const { status } = require('http-status');
const uploadStorage = require('../../multer/storage');
const Blog = require('../../models/Blog');
const generateFilePath = require('../../helpers/generateFilePath');
const createCustomErrorMsg = require('../../helpers/createCustomErrorMsg');

router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll();
    console.log(blogs[0].dataValues);
    res.status(status.OK).render('admin/blogs', {
      activePage: 'blogs',
      blogs: blogs,
    });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.BAD_REQUEST,
    });
  }
});

router.get('/update/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findOne({ where: { id: id } });
    res.status(status.OK).render('admin/edit_blog', {
      activePage: 'blogs',
      blog: blog.dataValues,
    });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.BAD_REQUEST,
    });
  }
});

router.get(
  '/add',
  uploadStorage.single('preview_img'),
  async (req, res, next) => {
    try {
      res.status(status.OK).render('admin/add_blog', { activePage: 'blogs' });
    } catch (error) {
      res.status(status.BAD_REQUEST).json({
        message: `${createCustomErrorMsg(error)}`,
        status: status.BAD_REQUEST,
      });
    }
  }
);

router.post(
  '/add',
  uploadStorage.single('preview_img'),
  async (req, res, next) => {
    try {
      const { id } = req.user;
      const { blog_title, blog_text } = req.body;
      if (!blog_title || !blog_text) {
        return res.status(status.BAD_REQUEST).json({
          message: 'Some parameters missing',
          status: status.BAD_REQUEST,
        });
      }
      await Blog.create({
        admin_id: id,
        blog_title: blog_title,
        preview_img: generateFilePath(req.file.filename),
        image_name: req.file.filename,
        blog_text: blog_text,
      });
      res.status(status.CREATED).json({
        message: 'Blog Shared !',
        status: status.CREATED,
      });
    } catch (error) {
      res.status(status.BAD_REQUEST).json({
        message: `${createCustomErrorMsg(error)}`,
        status: status.BAD_REQUEST,
      });
    }
  }
);

router.patch(
  '/update/:id',
  uploadStorage.single('preview_img'),
  async (req, res, next) => {
    try {
      const { blog_title, blog_text } = req.body;
      const { id } = req.params;
      await Blog.update(
        {
          blog_title: blog_title,
          blog_text: blog_text,
        },
        { where: { id: id } }
      );
      res.status(status.OK).json({
        msg: 'Blog Upadated !',
        status: status.OK,
      });
    } catch (error) {
      res.status(status.BAD_REQUEST).json({
        message: `${createCustomErrorMsg(error)}`,
        status: status.BAD_REQUEST,
      });
    }
  }
);

module.exports = router;
