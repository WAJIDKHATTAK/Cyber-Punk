const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBlog = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    postedDate: Joi.date().required(),
    description: Joi.string().required(),
  }),
};
const updateBlog = {
  params: Joi.object().keys({
    blogId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string().optional(),
    postedDate: Joi.date().optional(),
    description: Joi.string().optional(),
  }),
};
const deleteBlog = {
  params: Joi.object().keys({
    blogId: Joi.required().custom(objectId),
  }),
};
const getSingleBlog = {
  params: Joi.object().keys({
    blogId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
  getSingleBlog,
};
