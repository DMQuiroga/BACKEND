'use strict';
// EXPORTS NEWS

const getNewsId = require('./getNewsId.js');
const { createNews } = require('./createNews.js');
const deleteNews = require('./deleteNews.js');
const {
  getAllNewsOrderByDate,
  getAllNewsOrderByScore,
} = require('./getAllNewsOrderBy.js');
const getFakeNews = require('./getFakeNews.js');
const getTodayNews = require('./getTodayNews.js');
const { voteLike, voteDislike, voteFakeNews } = require('./voteNews.js');
const { getBestNews, getWorstNews } = require('./getBestWorstNews.js');
const { editNews } = require('./editNews.js');
const { editNewsId } = require('./editNewsId.js');

module.exports = {
  getNewsId,
  createNews,
  deleteNews,
  getAllNewsOrderByDate,
  getFakeNews,
  getTodayNews,
  voteLike,
  voteDislike,
  getBestNews,
  getWorstNews,
  editNews,
  getAllNewsOrderByScore,
  voteFakeNews,
  editNewsId,
};
