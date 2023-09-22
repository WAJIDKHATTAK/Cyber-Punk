const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { adminService } = require('../services');

const register = catchAsync(async (req, res) => {
  let body = req.body;
  const user = await adminService.register(body);
  res.status(httpStatus.CREATED).send(user);
});

const login = catchAsync(async (req, res) => {
  let body = req.body;
  const result = await adminService.login(body);

  const maxAge = 24 * 60 * 60 * 1000; // 24 hours
  res.cookie('myCookie', result.token, { maxAge });
  res.status(httpStatus.CREATED).send(result);
});

const logout = catchAsync(async (req ,res) => {
  const maxAge = 1;
  res.cookie('myCookie', '' , { maxAge});
  res.status(httpStatus.NO_CONTENT).json()
})
const updatePassword = catchAsync(async (req, res) => {
  let body = req.body;
  let userId = req.params.userId;
  const user = await adminService.updatePassword(body, userId);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  register,
  login,
  logout,
  updatePassword,
};
