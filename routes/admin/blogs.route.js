const router = require('express').Router();
const { status } = require('http-status');
const uploadStorage = require('../../multer/storage');
const Blog = require('../../models/Blog');
const generateFilePath = require('../../helpers/generateFilePath');

router.get('/', (req, res, next) => {
  try {
    res.status(status.OK).render('admin/blogs', { activePage: 'blogs' });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: error.message,
      status: status.BAD_REQUEST,
    });
  }
});

router.get('/add', (req, res, next) => {
  try {
    res.status(status.OK).render('admin/add_blog', { activePage: 'blogs' });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: error.message,
      status: status.BAD_REQUEST,
    });
  }
});

router.post(
  '/add',
  uploadStorage.single('preview_img'),
  async (req, res, next) => {
    try {
      const { blog_title, blog_text } = req.body;
      if (!blog_title || !blog_text) {
        res.status(status.BAD_REQUEST).json({
          mesage: 'Some parameters missing',
          status: status.BAD_REQUEST,
        });
      } else {
        await Blog.create({
          blog_title: blog_title,
          admin_id: 1,
          preview_img: `${generateFilePath(req.file.filename)}`,
          image_name: req.file.filename,
          blog_text: blog_text,
        });
        res.status(status.CREATED).json({
          message: 'Blog Shared',
          status: status.CREATED,
        });
      }
    } catch (error) {
      res.status(status.BAD_REQUEST).json({
        message: error.message,
        status: status.BAD_REQUEST,
      });
    }
  }
);

module.exports = router;
