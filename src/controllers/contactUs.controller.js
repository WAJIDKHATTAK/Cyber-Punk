const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { contactUsService } = require('../services');
const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport(config.email.smtp);

/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() =>
      logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env')
    );
}

/**
 * Send an email
 * @param {string} from
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (from, to, subject, text) => {
  const msg = { from, to, subject, text };
  await transport.sendMail(msg);
};

const createContactUs = catchAsync(async (req, res) => {
  const { email, message } = req.body;
  const to = config.email.to; // Use the "to" address from config

  // Pass the recipient's email address as the second argument
  await sendEmail(email, to, 'Contact Us Message', message);

  const blog = await contactUsService.createContactUs(req.body);

  res.status(httpStatus.CREATED).send(blog);
});

module.exports = {
  createContactUs,
};
