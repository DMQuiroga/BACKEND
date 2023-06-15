'use strict';

const express = require('express');
const { getCategory, getAllCategories } = require('../controllers/category/');
const router = express.Router();

// RUTAS PARA CATEGORIAS

// Obtener la categoria por id_categoria
router.get('/category/:id', getCategory);
// Obtener todas las categorias
router.get('/category', getAllCategories);

module.exports = router;
