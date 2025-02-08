const router = require('express').Router();
const { status } = require('http-status');
router.get('/whoami', (req, res, next) => {
  try {
    const user = req.user;
    console.log(user);
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: 'Something went wrong ',
      status: status.BAD_REQUEST,
    });
  }
});

module.exports = router;
