const { status } = require('http-status');
const jwt = require('jsonwebtoken');
const loginLogMiddleware = require('./logLoginMiddleware');

const userAuthMiddleWare = async (req, res, next) => {
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    const token = req.cookies.token;
    if (!token) {
      loginLogMiddleware(
        'UNAUTHORIZED',
        '',
        req.ip.includes('::ffff:') ? req.ip.split('::ffff:')[1] : req.ip
      );
      return res.status(status.UNAUTHORIZED).render('admin/unauthorized', {
        msg: 'Invalid Authorizatin Try',
        login_redirect: '/admin/signin',
      });
    } else {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          loginLogMiddleware(
            'UNAUTHORIZED',
            '',
            req.ip.includes('::ffff:') ? req.ip.split('::ffff:')[1] : req.ip
          );
          return res.status(status.UNAUTHORIZED).render('admin/unauthorized', {
            msg: 'Session Expired. Please login',
            login_redirect: '/admin/signin',
          });
        }
        req.user = decoded;
        next();
      });
    }
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: 'Something went wrong. Please try again later.',
      status: status.BAD_REQUEST,
    });
  }
};

module.exports = userAuthMiddleWare;
