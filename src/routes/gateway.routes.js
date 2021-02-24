const express = require('express');
const router = express.Router();

const gateways = require('../controllers/gateway.controller');

router.get('/', gateways.index);
router.get('/:id', gateways.details);
router.post('/', gateways.create);
router.put('/:id', gateways.edit);
router.delete('/:id', gateways.delete);

module.exports = router;