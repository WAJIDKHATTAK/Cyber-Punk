const express = require('express');
const adminRoute = require('./admin.route');
const blogRoute = require('./blog.route');
const contactUsRoute = require('./contactUs.route');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/admin',
    route: adminRoute,
  },
  {
    path: "/blog",
    route: blogRoute,
  },
  {
    path: "/contactUs",
    route: contactUsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
