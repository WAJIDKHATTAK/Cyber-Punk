const express = require("express");
const validate = require("../middlewares/validate");
const contactUsValidation = require("../validations/contactUs.validation");
const { contactUsController } = require("../controllers");
const router = express.Router();

router
  .route("/")
  .post(
    validate(contactUsValidation.createContactUs),
    contactUsController.createContactUs
  );

module.exports = router;
