const getDB = require('../../database/db');

async function updateUser(req, res, next) {
  let connect = null;

  try {
    const { userId, name, surname, email, password } = req.body;

    connect = await getDB();

    // Comprobar si se proporcionó id de usuario
    if (!userId) {
      return res.status(400).send({
        status: 'ko',
        error:
          '(userId) Le recordamos un campo obligatorio proporcionarnos su id de usuario',
      });
    }
    // Comprobar si se proporcionó email
    if (!email) {
      return res.status(400).send({
        status: 'ko',
        error: '(email) El email es un campo obligatorio',
      });
    }
    // Comprobar si se proporcionó contraseña
    if (!password) {
      return res.status(400).send({
        status: 'ko',
        error: '(password) Se requiere agregar password',
      });
    }

    // Comprobar si se proporcionó nombre
    if (!name) {
      return res.status(400).send({
        status: 'ko',
        error: '(name) Introduzca su nombre es un campo obligatorio',
      });
    }
    // Comprobar si se proporcionó apellido
    if (!surname) {
      return res.status(400).send({
        status: 'ko',
        error: '(surname) Es obligatorio un campo con sus apellidos',
      });
    }

    // Verificar si el usuario existe antes de editarlo
    const [existingUser] = await connect.query(
      `SELECT id FROM users WHERE id = ?`,
      [userId]
    );
    if (existingUser.length === 0) {
      return res.status(404).send({
        status: 'ko',
        error: 'El usuario solicitado no existe',
      });
    }

    // Actualizar los datos del usuario en la base de datos
    await connect.query(
      `
      UPDATE users
      SET name = ?, surname = ?, email = ?, password = SHA2(?, 512)
      WHERE id = ?
      `,
      [name, surname, email, password, userId]
    );

    return res.status(200).send({
      status: 'ok',
      message: `Enhorabuena ${name} ${surname}, tus datos de perfil han sido actualizados exitosamente`,
      data: {
        updateName: name,
        updateSurname: surname,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connect) connect.release();
  }
}

module.exports = updateUser;
