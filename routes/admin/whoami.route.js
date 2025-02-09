const router = require('express').Router();
const { status } = require('http-status');
const createCustomErrorMsg = require('../../helpers/createCustomErrorMsg');
router.get('/whoami', (req, res, next) => {
  try {
    const user = req.user;
    console.log(user);
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.BAD_REQUEST,
    });
  }
});

module.exports = router;
