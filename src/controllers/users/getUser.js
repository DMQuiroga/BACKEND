'use strict';
// OBTENER USUARIO POR ID

const getConnection = require('../../database/db');

const getUser = async (req, res, next) => {
  const connect = await getConnection();

  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).send({
        status: 'ko',
        error:
          'Lamentablemente, el valor proporcionado no es válido. Se requiere ingresar un número de identificación de usuario en lugar de texto',
      });
    }

    const [users] = await connect.query(
      `SELECT id, name, surname, email, imageUrl, biography, createdAt  FROM users WHERE id=?`,
      [id]
    );

    if (users.length) {
      res.status(200).send({
        status: 'ok',
        message: `Usuario con id: ${users[0].id} encontrado correctamente`,
        data: users[0],
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

module.exports = getUser;
