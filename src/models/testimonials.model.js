const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const mongoDuplicateKeyError = require('../utils/mongoDuplicateKeyError');

const testimonialSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  testimony: {
    type: String,
    required: true,
    trim: true,
  },
});

testimonialSchema.plugin(toJSON);
testimonialSchema.plugin(paginate);
mongoDuplicateKeyError(testimonialSchema);
