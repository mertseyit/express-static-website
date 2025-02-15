const router = require('express').Router();
const { status } = require('http-status');
const uploadStorage = require('../../multer/storage');
const Testimonial = require('../../models/Testimonial');
const generateFilePath = require('../../helpers/generateFilePath');
const createCustomErrorMsg = require('../../helpers/createCustomErrorMsg');
const path = require('path');
const findExistFileAndRemove = require('../../helpers/findExistFileAndRemove');
const logActivityMiddlewre = require('../../middlewares/logActivityMiddleware');

router.get('/', async (req, res, next) => {
  try {
    const testimonials = await Testimonial.findAll();
    res.status(status.OK).render('admin/testimonials', {
      activePage: 'testimonials',
      testimonials: testimonials,
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
    const testimonial = await Testimonial.findOne({ where: { id: id } });
    res.status(status.OK).render('admin/edit_testimonial', {
      activePage: 'blogs',
      testimonial: testimonial.dataValues,
    });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.BAD_REQUEST,
    });
  }
});

router.get('/add', async (req, res, next) => {
  try {
    res
      .status(status.OK)
      .render('admin/add_testimonial', { activePage: 'testimonials' });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.BAD_REQUEST,
    });
  }
});

router.post(
  '/add',
  logActivityMiddlewre,
  uploadStorage.single('testimonial_profile'),
  async (req, res, next) => {
    try {
      const { id } = req.user;
      const {
        testimonial_name,
        testimonial_position,
        testimonial_text,
        testimonial_rate,
      } = req.body;
      if (
        !testimonial_name ||
        !testimonial_position ||
        !testimonial_text ||
        !testimonial_rate ||
        !req.file
      ) {
        return res.status(status.BAD_REQUEST).json({
          message: 'Some parameters are missing',
          status: status.BAD_REQUEST,
        });
      }

      await Testimonial.create({
        admin_id: id,
        testimonial_name: testimonial_name,
        testimonial_position: testimonial_position,
        testimonial_rate: testimonial_rate,
        testimonial_text: testimonial_text,
        testimonial_profile: generateFilePath(
          req.file.filename,
          'img/testimonials'
        ),
        image_name: req.file.filename,
      });

      res.status(status.CREATED).json({
        message: 'Testimonial created !',
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
  logActivityMiddlewre,
  uploadStorage.single('testimonial_profile'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        testimonial_name,
        testimonial_position,
        testimonial_text,
        testimonial_rate,
      } = req.body;

      if (!req.file) {
        return res.status(status.BAD_REQUEST).json({
          message: 'Testimonial profile require',
          status: status.BAD_REQUEST,
        });
      }

      const existTestimonial = await Testimonial.findOne({ where: { id: id } });
      if (!existTestimonial) {
        return res.status(status.NOT_FOUND).json({
          message: 'Testimonial not found',
          status: status.NOT_FOUND,
        });
      }
      const image_path = path.join(
        `${__dirname}`,
        '..',
        '..',
        'public',
        'img',
        'testimonials',
        `${existTestimonial.dataValues.image_name}`
      );

      await Testimonial.update(
        {
          testimonial_name: testimonial_name,
          testimonial_position: testimonial_position,
          testimonial_rate: testimonial_rate,
          testimonial_text: testimonial_text,
          testimonial_profile: generateFilePath(
            req.file.filename,
            'img/testimonials'
          ),
          image_name: req.file.filename,
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
        message: 'Testimonial upadated !',
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

router.delete('/delete/:id', logActivityMiddlewre, async (req, res, next) => {
  try {
    const { id } = req.params;
    const existTestimonial = await Testimonial.findOne({ where: { id: id } });
    if (!existTestimonial) {
      return res.status(status.NOT_FOUND).json({
        message: 'Testimonial not found',
        status: status.NOT_FOUND,
      });
    }

    const image_path = path.join(
      `${__dirname}`,
      '..',
      '..',
      'public',
      'img',
      'testimonials',
      `${existTestimonial.dataValues.image_name}`
    );

    const response = await findExistFileAndRemove(image_path);
    if (!response) {
      return res.status(status.INTERNAL_SERVER_ERROR).json({
        message: 'Someting went wrong. Please try again later',
        status: status.INTERNAL_SERVER_ERROR,
      });
    }

    await Testimonial.destroy({ where: { id: id } });

    res.status(status.OK).json({
      message: 'Testimonial Deleted !',
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
