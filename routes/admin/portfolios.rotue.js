const router = require('express').Router();
const { status } = require('http-status');
const uploadStorage = require('../../multer/storage');
const Portfolio = require('../../models/Portfolio');
const generateFilePath = require('../../helpers/generateFilePath');
const createCustomErrorMsg = require('../../helpers/createCustomErrorMsg');
const path = require('path');
const findExistFileAndRemove = require('../../helpers/findExistFileAndRemove');
const logActivityMiddlewre = require('../../middlewares/logActivityMiddleware');

router.get('/', async (req, res, next) => {
  try {
    const portfolios = await Portfolio.findAll();
    res.status(status.OK).render('admin/portfolios', {
      activePage: 'portfolios',
      portfolios: portfolios,
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
    const portfolio = await Portfolio.findOne({ where: { id: id } });
    if (!portfolio) {
      return next('Portfolio Not Founded');
    }
    res.status(status.OK).render('admin/edit_portfolio', {
      activePage: 'blogs',
      portfolio: portfolio.dataValues,
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
      .render('admin/add_portfolio', { activePage: 'portfolios' });
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
  uploadStorage.single('preview_img'),
  async (req, res, next) => {
    try {
      const { portfolio_title } = req.body;
      const { id } = req.user;
      if (!portfolio_title || !req.file) {
        return res.status(status.BAD_REQUEST).json({
          message: 'Some parameters are missing',
          status: status.BAD_REQUEST,
        });
      }

      await Portfolio.create({
        admin_id: id,
        portfolio_title: portfolio_title,
        preview_img: generateFilePath(req.file.filename, 'img/portfolios'),
        image_name: req.file.filename,
      });

      res.status(status.CREATED).json({
        message: 'Portfolio created !',
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
  uploadStorage.single('preview_img'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { portfolio_title } = req.body;
      if (!req.file) {
        return res.status(status.BAD_REQUEST).json({
          message: 'Portfolio image require',
          status: status.BAD_REQUEST,
        });
      }

      const existPortfolio = await Portfolio.findOne({
        where: { id: id },
      });

      if (!existPortfolio) {
        return res.status(status.NOT_FOUND).json({
          message: 'Portfolio not found',
          status: status.NOT_FOUND,
        });
      }

      const image_path = path.join(
        `${__dirname}`,
        '..',
        '..',
        'public',
        'img',
        'portfolios',
        `${existPortfolio.dataValues.image_name}`
      );

      await Portfolio.update(
        {
          portfolio_title: portfolio_title,
          preview_img: generateFilePath(req.file.filename, 'img/portfolios'),
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

      res.status(status.CREATED).json({
        message: 'Portfolio updated !',
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

router.delete('/delete/:id', logActivityMiddlewre, async (req, res, next) => {
  try {
    const { id } = req.params;
    const existPortfolio = await Portfolio.findOne({ where: { id: id } });
    if (!existPortfolio) {
      return res.status(status.NOT_FOUND).json({
        message: 'Portfolio not found',
        status: status.NOT_FOUND,
      });
    }

    const image_path = path.join(
      `${__dirname}`,
      '..',
      '..',
      'public',
      'img',
      'portfolios',
      `${existPortfolio.dataValues.image_name}`
    );

    const response = await findExistFileAndRemove(image_path);
    if (!response) {
      return res.status(status.INTERNAL_SERVER_ERROR).json({
        message: 'Someting went wrong. Please try again later',
        status: status.INTERNAL_SERVER_ERROR,
      });
    }

    await Portfolio.destroy({ where: { id: id } });

    res.status(status.OK).json({
      message: 'Portfolio Deleted !',
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
