const router = require('express').Router();
const { status } = require('http-status');
const ActivityLog = require('../../models/ActivityLog');
const LoginLog = require('../../models/LoginLog');
router.get('/', async (req, res, next) => {
  try {
    const activityLogs = await ActivityLog.findAll({
      order: [['createdat', 'DESC']],
    });

    const loginLogs = await LoginLog.findAll({
      order: [['createdat', 'DESC']],
    });
    res.status(status.OK).render('admin/logs', {
      activePage: 'logs',
      activityLogs: activityLogs,
      loginLogs: loginLogs,
    });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({
      message: `${createCustomErrorMsg(error)}`,
      status: status.INTERNAL_SERVER_ERROR,
    });
  }
});

module.exports = router;
