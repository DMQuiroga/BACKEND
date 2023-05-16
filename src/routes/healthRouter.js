'use strict';

const express = require('express');

const { healthCheck } = require('../controllers/health');

const router = express.Router();

router.get('/health', healthCheck);

module.exports = router;
