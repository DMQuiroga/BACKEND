'use strict';
// LOGOUT

const jwt = require('jsonwebtoken');

const logoutUser = (req, res, next) => {
  const { generateError } = require('../../helpers/helpers');

  try {
    // Token de autorización del encabezado de la solicitud
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateError('Falta autorización', 401);
    }

    // Verificar token
    try {
      jwt.verify(authorization, process.env.SECRET);
    } catch {
      throw generateError('Token incorrecto', 401);
    }

    res.json({ message: 'Sesión cerrada con éxito' });
  } catch (error) {
    next(error);
  }
};

module.exports = logoutUser;
