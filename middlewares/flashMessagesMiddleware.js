const flashMessageMiddleware = (req, res, next) => {
  try {
    res.locals.message = req.flash();
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = flashMessageMiddleware;
