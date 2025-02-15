const ActivityLog = require('../models/ActivityLog');
const activityLogMiddleware = async (req, res, next) => {
  try {
    await ActivityLog.create({
      admin_name: `${req.user.id}`,
      ip_address: req.ip.includes('::ffff:')
        ? req.ip.split('::ffff:')[1]
        : req.ip,
      event:
        req.method === 'POST'
          ? 0
          : req.method === 'DELETE'
          ? 1
          : req.method === 'PATCH'
          ? 2
          : 2,
      page: req.originalUrl,
    });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = activityLogMiddleware;
