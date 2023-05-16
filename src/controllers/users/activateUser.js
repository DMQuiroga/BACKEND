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

    //SI NO EXISTE, LANZO ERROR
    if (user.length < 1) {
      throw new Error(
        'no hay usuario pendiente de valicación con ese código de registro'
      );
    }

    //ACTIVAR USUARIO
    try {
      await connection.query(
        `
              UPDATE users
              SET active=1, registrationCode = NULL
              WHERE registrationCode = ?
              `,
        [registrationcode]
      );
    } catch (error) {
      throw new Error('no se pudo activar el usuario');
    }
    res.send({
      status: 'ok',
      message: 'El usuario fue activado correctamente',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = activateUser;
