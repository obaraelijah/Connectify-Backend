const express = require('express');

const router = express.Router();

const keyRouters = require('../module/key/key.router');
const userRouters = require('../module/user/user.route');
const authRouters = require('../module/auth/auth.route');
const orderRouters = require('../module/order/order.route');
const paymentRouters = require('../module/payment/payment.route');
const consumerRouters = require('../module/consumer/consumer.router');

const moduleRoutes = [
  { path: '/key', route: keyRouters },
  { path: '/auth', route: authRouters },
  { path: '/users', route: userRouters },
  { path: '/order', route: orderRouters },
  { path: '/payment', route: paymentRouters },
  { path: '/consumer', route: consumerRouters },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

module.exports = applicationRoutes = router;