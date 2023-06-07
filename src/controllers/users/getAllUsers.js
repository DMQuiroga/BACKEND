'use strict';
// OBTENER TODOS LOS USUARIOS

const getConnection = require('../../database/db');

const getAllUsers = async (req, res, next) => {
  const connect = await getConnection();

  try {
    const [users] = await connect.query(
      `SELECT id, name, surname, imageUrl, biography, createdAt FROM users`
    );

    if (users.length) {
      return res.send(users);
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
