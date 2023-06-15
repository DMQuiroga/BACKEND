const getDB = require('../../database/db');

async function updateUser(req, res, next) {
  let connect = null;

  try {
    const { userId, name, surname, email, password, biography } = req.body;

    connect = await getDB();

    // Comprobar si se proporcionó id de usuario
    if (!userId) {
      return res.status(400).send({
        status: 'ko',
        error:
          '(userId) Le recordamos un campo obligatorio proporcionarnos su id de usuario',
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
      SET name = ?, surname = ?, email = ?, password = SHA2(?, 512), biography = ?
      WHERE id = ?
      `,
      [name, surname, email, password, biography, userId]
    );

    return res.status(200).send({
      status: 'ok',
      message: `Enhorabuena ${name} ${surname}, tus datos de perfil han sido actualizados exitosamente`,
      data: {
        updateName: name,
        updateSurname: surname,
        updateEmail: email,
        updateBiography: biography,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connect) connect.release();
  }
}

module.exports = updateUser;
