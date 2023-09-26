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
  const result = await adminService.login(body,res);
  res.status(httpStatus.CREATED).send(result);
});

const logout = catchAsync(async (req ,res) => {
  res.cookie('jwt', '' , {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(httpStatus.NO_CONTENT).json({ message: 'Logged out successfully' })
})
const updatePassword = catchAsync(async (req, res) => {
  let body = req.body;
  let userId = req.params.userId;
  const user = await adminService.updatePassword(body, userId);
  res.status(httpStatus.CREATED).send(user);
});
const updateAdmin = catchAsync(async (req ,res) => {
  let adminId = req.params.adminId;
  let body = req.body;
  const admin = await adminService.updateAdminInfo(adminId,body);
  res.status(httpStatus.CREATED).send(admin);
})
module.exports = {
  register,
  login,
  logout,
  updatePassword,
  updateAdmin,
};
