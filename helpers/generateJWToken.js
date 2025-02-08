const jwt = require('jsonwebtoken');

const generateJWToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  });
  return token;
};

module.exports = generateJWToken;
