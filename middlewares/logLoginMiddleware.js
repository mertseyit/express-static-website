const LoginLog = require('../models/LoginLog');
const loginLogMiddleware = async (status, user_id, ip_address) => {
  await LoginLog.create({
    admin_name: `${user_id ? user_id : 'No User'}`,
    admin_email: `${user_id ? user_id : 'No User'}`,
    ip_address: `${ip_address}`,
    status:
      status === 'UNAUTHORIZED'
        ? 0
        : status === 'INCORRECT_PASSWORD'
        ? 1
        : status === 'SUCCESS'
        ? 2
        : status === 'USER_NOT_FOUND'
        ? 3
        : 0,
  });
};

module.exports = loginLogMiddleware;
