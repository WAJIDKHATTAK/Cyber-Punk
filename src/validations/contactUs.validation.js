const Joi = require("joi");

const createContactUs = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.number().required(),
    city : Joi.string().required(),
    message: Joi.string().required(),
  }),
};

module.exports = {
  createContactUs,
};
