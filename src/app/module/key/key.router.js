const express = require('express');
const router = express.Router();
const { createKey, modifyKey, deleteKey, keyList } = require('./key.controller');

router.get('/', keyList);
router.post('/:consumerId/key', createKey);
router.patch('/:id', modifyKey);
router.delete('/:id', deleteKey);

module.exports = router;