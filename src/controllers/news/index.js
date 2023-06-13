'use strict';
// EXPORT

const getNewsId = require('./getNewsId.js');
const { createNew } = require('./createNew.js');
const deleteNew = require('./deleteNew.js');
const getAllNews = require('./getAllNews.js');
const getTodayNews = require('./getTodayNews.js');
const { voteLike, voteDislike } = require('./voteNew.js');
const { getBestNews, getWorstNews } = require('./getBestWorstNews.js');
const { editNews } = require('./editNews.js');

module.exports = {
  getNewsId,
  createNew,
  deleteNew,
  getAllNews,
  getTodayNews,
  voteLike,
  voteDislike,
  getBestNews,
  getWorstNews,
  editNews,
};
