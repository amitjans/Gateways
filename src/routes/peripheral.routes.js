const express = require('express');
const router = express.Router();

const peripherals = require('../controllers/peripheral.controller');

router.get('/', peripherals.index);
router.get('/:id', peripherals.details);
router.post('/', peripherals.create);
router.put('/:id', peripherals.edit);
router.delete('/:id', peripherals.delete);

module.exports = router;