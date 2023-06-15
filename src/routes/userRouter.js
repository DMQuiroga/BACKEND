'use strict';

const express = require('express');

const {
  getUser,
  createUser,
  updateUser,
  activateUser,
  loginUser,
  getAllUsers,
  logoutUser,
} = require('../controllers/users');

const { authUser } = require('../middlewares/auth');

const router = express.Router();

// RUTAS PARA USUARIOS

// Activación de usuario
router.get('/activate/:registrationcode', activateUser);
// Crear nuevo usuario con validación de email
router.post('/user', createUser);
// Actualizar información usuario
router.put('/user', authUser, updateUser);
// Obtener información de usuarios
router.get('/users/', authUser, getAllUsers);
// Obtener información de usuario
router.get('/user/:id', authUser, getUser);
// Iniciar de sesión
router.post('/login', loginUser);
// Cerrar sesión
router.post('/logout', authUser, logoutUser);

module.exports = router;
