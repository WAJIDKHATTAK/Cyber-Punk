const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const mongoDuplicateKeyError = require('../utils/mongoDuplicateKeyError');

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    postedDate: {
      type: Date,
      default: new Date(),
    },
    featureImage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
blogSchema.plugin(toJSON);
blogSchema.plugin(paginate);

mongoDuplicateKeyError(blogSchema);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
