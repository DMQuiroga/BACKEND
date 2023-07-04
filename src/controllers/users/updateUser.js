'use strict';
// ACTUALIZAR INFORMACIÓN DE UN USUARIO

const getDB = require('../../database/db');
const { createPathIfNotExists } = require('../../helpers/helpers');
const path = require('path');
const sharp = require('sharp');

async function updateUser(req, res, next) {
  let connection = null;

  try {
    const { userId, name, surname, email, password, biography } = req.body;

    connection = await getDB();

    // Comprobar si se proporcionó id de usuario
    if (!userId) {
      return res.status(400).send({
        status: 'ko',
        error:
          '(userId) Le recordamos que es obligatorio proporcionar su id de usuario.',
      });
    }

    // Comprobar si el usuario actual coincide con el userId que desea modificar
    if (req.userId !== parseInt(userId)) {
      return res.status(403).send({
        status: 'ko',
        error: 'No tienes permisos para modificar estos datos de perfil.',
      });
    }

    // Comprobar la validez y longitud de los nombre
    if (!name || name.length > 100) {
      return res.status(400).send({
        status: 'ko',
        error:
          '(name) Le recordamos que debe proporcionarnos su nombre y debe tener una extensión máxima de 100 caracteres.',
      });
    }

    // Comprobar la validez y longitud de los apellidos
    if (!surname || surname.length > 200) {
      return res.status(400).send({
        status: 'ko',
        error:
          '(surname) Le recordamos que debe proporcionarnos sus apellidos y debe tener una extensión máxima de 200 caracteres.',
      });
    }

    // Comprobar si se proporcionó un correo electrónico
    if (!email) {
      return res.status(400).send({
        status: 'ko',
        error:
          '(email) Le recordamos que debe proporcionarnos su correo electrónico.',
      });
    }

    let photoFileName;
    // Procesamiento de la imagen de perfil (si se proporcionó una)
    if (req.files && req.files.imageUrl) {
      const uploadsDir = path.join(__dirname, `..`, `..`, `uploads`);
      // Crear el directorio de subida si no existe
      await createPathIfNotExists(uploadsDir);

      const imageUrl = sharp(req.files.imageUrl.data);
      imageUrl.resize(1000);

      photoFileName = `${Date.now()}_${req.files.imageUrl.name}`;
      await imageUrl.toFile(path.join(uploadsDir, photoFileName));
    }

    // Verificar si el usuario existe antes de editarlo
    const [existingUser] = await connection.query(
      `SELECT id FROM users WHERE id = ?`,
      [userId]
    );
    if (existingUser.length === 0) {
      return res.status(404).send({
        status: 'ko',
        error: 'El usuario solicitado no existe.',
      });
    }

    // Actualizar los datos del usuario en la base de datos
    const lastUpdatedAt = new Date();

    await connection.query(
      `
      UPDATE users
      SET imagenUrl = ?, name = ?, surname = ?, email = ?, password = SHA2(?, 512), biography = ?, lastUpdatedAt = ?
      WHERE id = ?
      `,
      [
        photoFileName,
        name,
        surname,
        email,
        password,
        biography,
        lastUpdatedAt,
        userId,
      ]
    );

    return res.status(200).send({
      status: 'ok',
      message: `Enhorabuena ${name} ${surname}, tus datos de perfil han sido actualizados exitosamente.`,
      data: {
        updateName: name,
        updateSurname: surname,
        updateEmail: email,
        updateBiography: biography,
        lastUpdatedAt: lastUpdatedAt,
        updateAvatarPhoto: photoFileName,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = updateUser;
