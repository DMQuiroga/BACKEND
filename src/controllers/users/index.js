'use strict';
// EXPORTS USER

const getAllUsers = require('./getAllUsers');
const getUser = require('./getUser');
const createUser = require('./createUser');
const updateUser = require('./updateUser');
const activateUser = require('./activateUser');
const loginUser = require('./loginUser');
const logoutUser = require('./logoutUser');
const getMe = require('./getMe');

module.exports = {
  getUser,
  createUser,
  activateUser,
  loginUser,
  getAllUsers,
  logoutUser,
  updateUser,
  getMe,
};
