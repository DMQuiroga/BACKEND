'use strict';

const express = require('express');
const { authUser } = require('../middlewares/auth');

const {
  getNewsId,
  deleteNew,
  createNew,
  getAllNewsOrderByDate,
  getTodayNews,
  voteLike,
  voteDislike,
  voteFakeNew,
  getFakeNews,
  getBestNews,
  getWorstNews,
  editNews,
  getAllNewsOrderByScore,
} = require('../controllers/news');

const router = express.Router();

// RUTAS PARA NOTICIAS

router.get('/news/:id', authUser, getNewsId);
router.get('/news', authUser, getAllNewsOrderByDate);
router.get('/news-score', authUser, getAllNewsOrderByScore);
router.get('/today-news', getTodayNews);
router.get('/today-news/:categoryId', getTodayNews);
router.get('/best', getBestNews);
router.get('/worst', getWorstNews);
router.get('/fake', getFakeNews);
router.delete('/news/:id', authUser, deleteNew);
router.post('/news', authUser, createNew);
router.put('/edit', authUser, editNews);
router.post('/news/:id/like', authUser, voteLike);
router.post('/news/:id/dislike', authUser, voteDislike);
router.post('/news/:id/fake', authUser, voteFakeNew);

module.exports = router;
