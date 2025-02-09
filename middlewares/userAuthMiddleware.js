const { status } = require('http-status');
const jwt = require('jsonwebtoken');

const userAuthMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(status.UNAUTHORIZED).render('admin/'); // !TOOD:Burada kaldın
    } else {
      jwt.verify(
        token.split(' ')[1],
        process.env.JWT_SECRET_KEY,
        (err, decoded) => {
          if (err) {
            return res.status(status.UNAUTHORIZED).json({
              message: 'Session Expired',
              status: status.UNAUTHORIZED,
            });
          }
          req.user = decoded;
          next();
        }
      );
    }
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: 'Something went wrong. Please try again later.',
      status: status.BAD_REQUEST,
    });
  }
};

module.exports = userAuthMiddleWare;
