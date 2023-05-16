const express = require('express');

const {
  getUser,
  createUser,
  activateUser,
  loginUser,
  getAllUsers,
} = require('../controllers/users');

const { authUser } = require('../middlewares/auth');

const router = express.Router();

// RUTAS PARA USUARIOS

router.get('/activate/:registrationcode', activateUser);
router.post('/user', createUser);
router.get('/users/', authUser, getAllUsers);
router.get('/user/:id', authUser, getUser);
router.post('/login', loginUser);

module.exports = router;
