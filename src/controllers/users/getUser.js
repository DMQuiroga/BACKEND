'use strict';
// OBTENER USUARIO POR ID

const getConnection = require('../../database/db');

const getUser = async (req, res, next) => {
  const connect = await getConnection();

  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).send({
        error: 'Formato ID incorrecto',
      });
    }

    const [users] = await connect.query(
      `SELECT id, name, surname, email, imageUrl, biography, createdAt  FROM users WHERE id=?`,
      [id]
    );

    if (users.length) {
      return res.send(users[0]);
    } else {
      res.status(404).send({
        error: 'Usuario no encontrado',
      });
    }
  } catch (error) {
    next(error);
  } finally {
    connect.release();
  }
};

module.exports = getUser;
