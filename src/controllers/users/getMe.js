'use strict';
// OBTENER EL USUARIO ACTUALMENTE AUTENTICADO

const getConnection = require('../../database/db');

const getMe = async (req, res, next) => {
  const connection = await getConnection();

  try {
    const userId = req.userId;

    // Consultar el usuario con el ID obtenido
    const [result] = await connection.query(
      `SELECT id, name, surname, email, imagenUrl, biography, createdAt, lastUpdatedAt, active FROM users WHERE id = ?`,
      [userId]
    );

    if (result.length > 0) {
      const user = result[0];

      if (user.active === 0) {
        return res.status(404).send({
          status: 'ko',
          error:
            'Lamentablemente, no se ha encontrado ningún usuario debidamente identificado y activo',
          message:
            'Regístrate, comprueba tu correo electrónico y haz click en el enlace de validación de usuario',
        });
      }

      if (user.active === 1) {
        res.status(200).send({
          status: 'ok',
          message: `Hola ${user.name} ${user.surname}!`,
          data: user,
        });
      }
    } else {
      res.status(404).send({
        status: 'ko',
        error: 'Lamentablemente, no te hemos encontrado',
      });
    }
  } catch (error) {
    next(error);
  } finally {
    connection.release();
  }
};

module.exports = getMe;
