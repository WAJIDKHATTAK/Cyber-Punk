const httpStatus = require('http-status');
const { Admin } = require('../models');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');
const generateJwtToken = require('../config/generateToken');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<Admin>}
 */
const register = async (userBody) => {
  try {
    return await Admin.create(userBody);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const login = async (userBody,res) => {
  const user = await Admin.findOne({ email: userBody.email })
  .select('-role -location');

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Credentials invalid');
  }
  const checkPassword = await user.isPasswordMatch(userBody.password);
  if (!checkPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Credentials invalid');
  }
  const userForResponse = {
    _id: user._id,
    email: user.email,
    };
  const token = await generateJwtToken(res,user._id, 'admin');
  const result = { token, userForResponse };
  return result;
};

const updatePassword = async (body, userId) => {
  try {
    const userMember = await Admin.findById(userId);
    if (!userMember) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'No user found');
    }
    const checkPassword = await userMember.isPasswordMatch(body.password);
    if (!checkPassword) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Password invalid');
    }

    const hashPassword = await bcrypt.hash(body.newPassword, 10);
    const updateUser = Admin.findOneAndUpdate({ _id: userId }, { $set: { password: hashPassword } }, { new: true });
    return updateUser;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
const updateAdminInfo = async (adminId, userBody) => {
  try {
    const updateFields = {};
    if (userBody.phoneNo !== undefined) {
      updateFields.phoneNo = userBody.phoneNo;
    }

    if (userBody.coordinates !== undefined) {
      updateFields['location.coordinates'] = userBody.coordinates;
    }
    const admin = await Admin.findByIdAndUpdate(adminId, {
      $set: updateFields,
    });
    if (!admin) {
      throw new Error('Admin not found');
    }
    return admin;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = {
  register,
  login,
  updatePassword,
  updateAdminInfo,
};
