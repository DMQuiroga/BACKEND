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
  voteFakeNews,
  getFakeNews,
  getBestNews,
  getWorstNews,
  editNews,
  getAllNewsOrderByScore,
} = require('../controllers/news');

const router = express.Router();

// RUTAS PARA NOTICIAS

// Obtener las noticias de un usuario
router.get('/news/:id', authUser, getNewsId);
// Listar noticias ordenadas por fecha
router.get('/news', authUser, getAllNewsOrderByDate);
// Obtener las noticias ordenadas por puntuación de likes
router.get('/news-score', authUser, getAllNewsOrderByScore);
// Obtener noticias del día ordenadas por puntuación de likes
router.get('/today-news', getTodayNews);
// Obtener noticias del día filtradas por categoría y ordenadas por puntuación de likes
router.get('/today-news/:categoryId', getTodayNews);
// Obtener las 3 mejores noticias(+likes)
router.get('/best', getBestNews);
// Obtener las 3 peores noticias(+dislikes)
router.get('/worst', getWorstNews);
// Obtener las fake noticias ordenadas por puntuación de fake news
router.get('/fake', getFakeNews);
// Eliminar noticia validando id usuario
router.delete('/news/:id', authUser, deleteNew);
// Crear nueva noticia
router.post('/news', authUser, createNew);
// Editar una noticia validando id usuario
router.put('/edit', authUser, editNews);
// Votar una noticia positivamente
router.post('/news/:id/like', authUser, voteLike);
// Votar una noticia negativamente
router.post('/news/:id/dislike', authUser, voteDislike);
// Votar una noticia fake
router.post('/news/:id/fake', authUser, voteFakeNews);

module.exports = router;
