const jwt = require('jsonwebtoken');
const config = require("./config")

const generateJwtToken = (res,_id, role) => {
  const token = jwt.sign({ _id, role }, config.jwt.secret, {
    expiresIn: '24h',
  });
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  return token;
};

module.exports = generateJwtToken;
