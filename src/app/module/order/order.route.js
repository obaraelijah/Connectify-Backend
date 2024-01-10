const express = require('express');
const router = express.Router();
const { orderLists, submitOrder, updateOrder, getOrderStatus, getShippingOptions } = require('./order.controller');

router.get('/',  orderLists);
router.post('/order',  submitOrder);
router.put('/order/:id',  updateOrder);
router.get('/order/:id/status',  getOrderStatus);
router.get('/order/:id/shipping',  getShippingOptions);

module.exports = router;