'use strict';
// ACTIVACIÓN DE USUARIO

const getDB = require('../../database/db');

async function activateUser(req, res, next) {
  let connection;
  try {
    const { registrationcode } = req.params;
    //COMPROBAR QUE EXISTA USUARIO CON ESE CÓDIGO DE ACTIVACION
    connection = await getDB();
    let user;

    try {
      [user] = await connection.query(
        `
              SELECT *
              FROM hb_news.users
              WHERE registrationcode =?
              `,
        [registrationcode]
      );
    } catch (error) {
      new Error('No se pudo comprobar coincidencias');
    }

    if (user.length < 1) {
      return res.status(404).send({
        status: 'ko',
        error: `No hay usuario pendiente de valicación con ese código de registro`,
      });
    }

    //ACTIVAR USUARIO
    try {
      await connection.query(
        `
              UPDATE users
              SET active=true, registrationCode = NULL
              WHERE registrationCode = ?
              `,
        [registrationcode]
      );
    } catch (error) {
      throw new Error('no se pudo activar el usuario');
    }
    res.status(200).send({
      status: 'ok',

      message: `Hola ${user[0].name} ${user[0].surname}, Gracias por activar tu cuenta en Hack a Boss News`,
      data: {
        id: user[0].id,
        name: user[0].name,
        surname: user[0].surname,
        email: user[0].email,
        createAt: user[0].createAt,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = activateUser;
