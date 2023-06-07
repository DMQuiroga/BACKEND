'use strict';
// EXPORT

const getAllUsers = require('./getAllUsers');
const getUser = require('./getUser');
const createUser = require('./createUser');
const activateUser = require('./activateUser');
const loginUser = require('./loginUser');
const logoutUser = require('./logoutUser');

module.exports = {
  getUser,
  createUser,
  activateUser,
  loginUser,
  getAllUsers,
  logoutUser,
};
