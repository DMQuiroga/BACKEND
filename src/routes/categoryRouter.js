const express = require('express');

const { getCategory, getAllCategories } = require('../controllers/category/');

const router = express.Router();

router.get('/category/:id', getCategory);
router.get('/category', getAllCategories);

module.exports = router;
