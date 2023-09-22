const Joi = require("joi");
const { objectId } = require("./custom.validation");

const register = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).required(),
    phoneNo : Joi.string().required(),
    location: Joi.object({
      type: Joi.string().valid('Point').required(),
      coordinates: Joi.array()
        .items(Joi.number())
        .length(2) // Assuming it's an array of exactly two numbers
        .required(),
      Name: Joi.string().required(),
    }).required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).required(),
  }),
};

const updatePassword = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    password: Joi.string().min(8).max(32).required(),
    newPassword: Joi.string().min(8).max(32).required(),
    confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required(),
  }),
};

module.exports = {
  login,
  register,
  updatePassword,
};
