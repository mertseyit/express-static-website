const router = require('express').Router();
const { status } = require('http-status');
const uploadStorage = require('../../multer/storage');
const Blog = require('../../models/Blog');
const generateFilePath = require('../../helpers/generateFilePath');
const createCustomErrorMsg = require('../../helpers/createCustomErrorMsg');
const path = require('path');
const findExistFileAndRemove = require('../../helpers/findExistFileAndRemove');

router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll();
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
      if (!req.file) {
        return res.status(status.BAD_REQUEST).json({
          message: 'Blog image require',
          status: status.BAD_REQUEST,
        });
      }
      await Blog.create({
        admin_id: id,
        blog_title: blog_title,
        preview_img: generateFilePath(req.file.filename, 'img/blogs'),
        image_name: req.file.filename,
        blog_text: blog_text,
      });
      res.status(status.CREATED).json({
        message: 'Blog shared !',
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

router.post(
  '/update/:id',
  uploadStorage.single('preview_img'),
  async (req, res, next) => {
    try {
      const { blog_title, blog_text } = req.body;
      console.log(blog_text);
      if (!req.file) {
        return res.status(status.BAD_REQUEST).json({
          message: 'Blog image require',
          status: status.BAD_REQUEST,
        });
      }
      const { id } = req.params;
      const existBlog = await Blog.findOne({ where: { id: id } });
      if (!existBlog.dataValues) {
        return res.status(status.NOT_FOUND).json({
          message: 'Blog not found for update',
          status: status.NOT_FOUND,
        });
      }

      const image_path = path.join(
        `${__dirname}`,
        '..',
        '..',
        'public',
        'img',
        'blogs',
        `${existBlog.dataValues.image_name}`
      );

      await Blog.update(
        {
          blog_title: blog_title,
          blog_text: blog_text,
          preview_img: generateFilePath(req.file.filename, 'img/blogs'),
          image_name: req.file
            ? req.file.filename
            : existBlog.dataValues.image_name,
        },
        { where: { id: id } }
      );

      const response = await findExistFileAndRemove(image_path);
      if (!response) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
          message: 'Someting went wrong. Please try again later',
          status: status.INTERNAL_SERVER_ERROR,
        });
      }

      res.status(status.OK).json({
        message: 'Blog upadated !',
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

router.delete('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const existBlog = await Blog.findOne({ where: { id: id } });
    if (!existBlog) {
      return res.status(status.NOT_FOUND).json({
        message: 'Blog not found',
        status: status.NOT_FOUND,
      });
    }

    const image_path = path.join(
      `${__dirname}`,
      '..',
      '..',
      'public',
      'img',
      'blogs',
      `${existBlog.dataValues.image_name}`
    );

    const response = await findExistFileAndRemove(image_path);
    if (!response) {
      return res.status(status.INTERNAL_SERVER_ERROR).json({
        message: 'Someting went wrong. Please try again later',
        status: status.INTERNAL_SERVER_ERROR,
      });
    }

    await Blog.destroy({ where: { id: id } });

    res.status(status.OK).json({
      message: 'Blog Deleted !',
      status: status.OK,
    });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.BAD_REQUEST,
    });
  }
});

module.exports = router;
