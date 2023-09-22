const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');

const requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, config.jwt.secret);
    req.user = user;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Authorization required');
  }
  next();
};

const authMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Only Admin Can Access');
  }
  next();
};

module.exports = {
  requireSignin,
  authMiddleware,
};
