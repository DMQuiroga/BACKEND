'use strict';
// OBTENER TODOS LOS USUARIOS

const getConnection = require('../../database/db');

const getAllUsers = async (req, res, next) => {
  const connect = await getConnection();

  try {
    const [users] = await connect.query(
      `SELECT id, name, surname, imagenUrl, biography, createdAt, lastUpdatedAt FROM users`
    );

    if (users.length) {
      res.status(200).send({
        status: 'ok',
        message: `Éxito en la obtención de usuarios`,
        data: users,
      });
    } else {
      res.status(404).send({
        status: 'ko',
        error: 'Usuario no encontrado',
      });
    }
  } catch (error) {
    next(error);
  } finally {
    connect.release();
  }
};

module.exports = getAllUsers;
