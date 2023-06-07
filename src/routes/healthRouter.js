'use strict';

const express = require('express');
const { healthCheck } = require('../controllers/health');
const router = express.Router();

// RUTA PARA I'M ALIVE

router.get('/health', healthCheck);

module.exports = router;
