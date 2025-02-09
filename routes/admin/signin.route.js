const router = require('express').Router();
const { status } = require('http-status');
const bcrypt = require('bcrypt');
const Admin = require('../../models/Admin');
const generateJWToken = require('../../helpers/generateJWToken');
const uploadStorage = require('../../multer/storage');
const createCustomErrorMsg = require('../../helpers/createCustomErrorMsg');
router.get('/', (req, res, next) => {
  try {
    res.status(status.OK).render('admin/signin');
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.BAD_REQUEST,
    });
  }
});

router.post('/', uploadStorage.none(), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(status.BAD_REQUEST).json({
        message: 'Some parameters missing',
        status: status.BAD_REQUEST,
      });
    }

    const existUser = await Admin.findOne({ where: { email: email } });
    if (!existUser) {
      return res.status(status.NOT_FOUND).json({
        message: 'User not found',
        status: status.BAD_REQUEST,
      });
    }

    const confirmPassword = await bcrypt.compare(
      password,
      existUser.dataValues.password
    );
    if (!confirmPassword) {
      return res.status(status.UNAUTHORIZED).json({
        message: 'Password incorrect',
        status: status.UNAUTHORIZED,
      });
    }

    res.cookie('token', generateJWToken({ id: existUser.dataValues.id }));

    res.status(status.OK).json({
      message: 'Logged',
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
