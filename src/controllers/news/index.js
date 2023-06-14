'use strict';
// EXPORT

const getNewsId = require('./getNewsId.js');
const { createNew } = require('./createNew.js');
const deleteNew = require('./deleteNew.js');
const getAllNewsOrderByDate = require('./getAllNewsOrderByDate.js');
const getTodayNews = require('./getTodayNews.js');
const { voteLike, voteDislike } = require('./voteNew.js');
const { getBestNews, getWorstNews } = require('./getBestWorstNews.js');
const { editNews } = require('./editNews.js');
const getAllNewsOrderByScore = require('./getAllNewsOrderByScore.js');

module.exports = {
  getNewsId,
  createNew,
  deleteNew,
  getAllNewsOrderByDate,
  getTodayNews,
  voteLike,
  voteDislike,
  getBestNews,
  getWorstNews,
  editNews,
  getAllNewsOrderByScore,
};
