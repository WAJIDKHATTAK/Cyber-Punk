const express = require("express");
const { requireSignin, authMiddleware } = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const blogValidation = require("../validations/blog.validation");
const { blogController } = require("../controllers");
const { fileUpload } = require("./../utils/fileUpload");
const router = express.Router();

router.route("/top-four")
.get(
  requireSignin,
  authMiddleware,
  blogController.topFourBlogs
  );

  router.route("/random")
.get(
  requireSignin,
  authMiddleware,
  blogController.randomBlogs
)

router.route("/")
.post(
      fileUpload.single("blogImage"),
      requireSignin,
      authMiddleware,
      validate(blogValidation.createBlog),
      blogController.createBlog
)
router.route("/all-blog")
.get(
      requireSignin,
      authMiddleware,
      blogController.getAllBlog
);
router.route("/:blogId")
.get(
  requireSignin,
  authMiddleware,validate(blogValidation.getSingleBlog),
  blogController.getSingleBlog
)
.delete(
  requireSignin,
  authMiddleware,
  validate(blogValidation.deleteBlog),
  blogController.deleteBlog
)
.patch(
  fileUpload.single("featureImage"),
  requireSignin,
  authMiddleware,
  validate(blogValidation.updateBlog),
  blogController.updateBlog
);


module.exports = router;
