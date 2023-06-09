'use strict';
// RESPONDE: I'M ALIVE

const healthCheck = async (req, res, next) => {
  try {
    // Enviar una respuesta indicando que el servidor está activo
    res.status(200).send({
      status: 'ok',
      message: "I'm alive!",
      data: {
        serverTime: new Date().toISOString(),
        uptime: process.uptime(),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = healthCheck;
