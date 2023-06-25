'use strict';
// LOGOUT USUARIO

const jwt = require('jsonwebtoken');

const logoutUser = (req, res, next) => {
  try {
    // Token de autorización del encabezado de la solicitud
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send({
        status: 'ko',
        error: `Falta autorización`,
      });
    }
    // Verificar token
    try {
      jwt.verify(authorization, process.env.SECRET);
    } catch {
      return res.status(401).send({
        status: 'ko',
        error: `Token incorrecto`,
      });
    }

    res.json({
      status: 'ok',
      message: `Sesión cerrada con éxito`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logoutUser;
