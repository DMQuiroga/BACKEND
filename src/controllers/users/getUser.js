'use strict';
// OBTENER USUARIO POR ID

const getConnection = require('../../database/db');

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).send({
        error: 'Formato ID incorrecto',
      });
    }

    const connect = await getConnection();
    const [users] = await connect.query(
      `SELECT id, name, surname, email, imageUrl, biography, createdAt  FROM users WHERE id=?`,
      [id]
    );
    connect.release();
    if (users.length) {
      return res.send(users[0]);
    } else {
      res.status(404).send({
        error: 'Usuario no encontrado',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getUser;
