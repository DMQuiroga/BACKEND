'use strict';
// ACTUALIZAR INFORMACIÓN DE UN USUARIO

const getDB = require('../../database/db');
const { createPathIfNotExists } = require('../../helpers/helpers');
const path = require('path');
const sharp = require('sharp');

async function updateUser(req, res, next) {
  let connection = null;

  try {
    const { name, surname, email, biography } = req.body;

    connection = await getDB();

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
    // Procesamiento de la imagen de la noticia (si se proporcionó una)
    if (req.files && Object.keys(req.files).length === 1) {
      // Crear el directorio de subida si no existe
      const dirUpload = path.join(__dirname, `..`, `..`, `uploads`);
      console.log(__dirname);
      console.log(req.files);
      await createPathIfNotExists(dirUpload);

      const imageUrl = sharp(req.files.ImagenUrl.data);
      imageUrl.resize(1000);

      photoFileName = `${Date.now()}_${req.files.ImagenUrl.name}`;
      await imageUrl.toFile(path.join(dirUpload, photoFileName));
    }

    // Verificar si el usuario existe antes de editarlo
    const [existingUser] = await connection.query(
      `SELECT id FROM users WHERE id = ?`,
      [req.userId]
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
      SET imagenUrl = ?, name = ?, surname = ?, email = ?,  biography = ?, lastUpdatedAt = ?
      WHERE id = ?
      `,
      [
        photoFileName,
        name,
        surname,
        email,
        biography,
        lastUpdatedAt,
        req.userId,
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
