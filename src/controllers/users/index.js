'use strict';
// EXPORTS

const getAllUsers = require('./getAllUsers');
const getUser = require('./getUser');
const createUser = require('./createUser');
const activateUser = require('./activateUser');
const loginUser = require('./loginUser');

module.exports = {
  getUser,
  createUser,
  activateUser,
  loginUser,
  getAllUsers,
};
