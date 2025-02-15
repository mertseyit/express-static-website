const router = require('express').Router();
const { status } = require('http-status');
const createCustomErrorMsg = require('../../helpers/createCustomErrorMsg');
router.post('/', (req, res, next) => {
  try {
    req.user = null;
    res.clearCookie('token');
    res.status(status.OK).json({
      message: 'Success !',
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
