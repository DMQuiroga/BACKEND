'use strict';
// EXPORT

const getNewsId = require('./getNewsId.js');
const { createNew } = require('./createNew.js');
const deleteNew = require('./deleteNew.js');
const {
  getAllNewsOrderByDate,
  getAllNewsOrderByScore,
} = require('./getAllNewsOrderBy.js');
const getFakeNews = require('./getFakeNews.js');
const getTodayNews = require('./getTodayNews.js');
const { voteLike, voteDislike, voteFakeNew } = require('./voteNew.js');
const { getBestNews, getWorstNews } = require('./getBestWorstNews.js');
const { editNews } = require('./editNews.js');

module.exports = {
  getNewsId,
  createNew,
  deleteNew,
  getAllNewsOrderByDate,
  getFakeNews,
  getTodayNews,
  voteLike,
  voteDislike,
  getBestNews,
  getWorstNews,
  editNews,
  getAllNewsOrderByScore,
  voteFakeNew,
};
