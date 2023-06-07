'use strict';

const express = require('express');
const { getCategory, getAllCategories } = require('../controllers/category/');
const router = express.Router();

// RUTAS PARA CATEGORIAS

router.get('/category/:id', getCategory);
router.get('/category', getAllCategories);

module.exports = router;
