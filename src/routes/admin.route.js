const express = require('express');
const { requireSignin, authMiddleware } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const adminValidation = require('../validations/admin.validation');
const { adminController } = require('../controllers');
const router = express.Router();

router.route('/register')
.post(
  requireSignin,
  authMiddleware,
  validate(adminValidation.register), adminController.register);

router.route('/login')
.post(validate(adminValidation.login),
 adminController.login);
router.route('/logout')
.get(
  requireSignin,
  authMiddleware,
  adminController.logout);

router.route('/updateInfo/adminId/:adminId')
 .patch(
  validate(adminValidation.updateAdmin),
  requireSignin,
  authMiddleware,
  adminController.updateAdmin
);
router
  .route('/update/password/:userId')
  .put(validate(adminValidation.updatePassword),
  requireSignin,
  authMiddleware,
  adminController.updatePassword);

module.exports = router;
