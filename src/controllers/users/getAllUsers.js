'use strict';
// OBTENER USUARIO POR ID

const getConnection = require('../../database/db');

const getAllUsers = async (req, res, next) => {
  try {
    const connect = await getConnection();
    const [users] = await connect.query(
      `SELECT name, surname, imageUrl, biography, createdAt FROM users`
    );
    connect.release();
    if (users.length) {
      return res.send(users);
    } else {
      res.status(404).send({
        error: 'Usuario no encontrado',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getAllUsers;
