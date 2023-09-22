const jwt = require('jsonwebtoken');
const config = require("./config")

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, config.jwt.secret, {
    expiresIn: '24h',
  });
};

module.exports = generateJwtToken;
