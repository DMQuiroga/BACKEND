'use strict';

const express = require('express');
const { authUser } = require('../middlewares/auth');

const {
  getNewsId,
  deleteNew,
  createNew,
  getAllNews,
  getTodayNews,
  voteLike,
  voteDislike,
  editNews,
} = require('../controllers/news');

const router = express.Router();

// RUTAS PARA NOTICIAS

router.get('/news/:id', authUser, getNewsId);
router.get('/news', authUser, getAllNews);
router.get('/today-news', getTodayNews);
router.get('/today-news/:categoryId', getTodayNews);
router.delete('/news/:id', authUser, deleteNew);
router.post('/news', authUser, createNew);
router.put('/edit', authUser, editNews);
router.post('/news/:id/like', authUser, voteLike);
router.post('/news/:id/dislike', authUser, voteDislike);

module.exports = router;
