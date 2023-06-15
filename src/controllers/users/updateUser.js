const getDB = require('../../database/db');

const { createPathIfNotExists } = require('../../helpers/helpers');

const path = require('path');
const sharp = require('sharp');

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

    if (!name || name > 100) {
      return res.status(400).send({
        status: 'ko',
        error:
          '(name) Le recordamos que debe proporcionarnos su nombre y debe tener una extensión máxima de 100 caracteres',
      });
    }
    // Comprobar la validez y longitud del texto introductorio
    if (!surname || surname > 200) {
      return res.status(400).send({
        status: 'ko',
        error:
          '(surname) Le recordamos que debe proporcionarnos sus apellidos y debe tener una extensión máxima de 200 caracteres',
      });
    }
    // Comprobar si se proporcionó contenido textual para la noticia
    if (!email) {
      return res.status(400).send({
        status: 'ko',
        error: '(email) Le recordamos que debe proporcionarnos su email',
      });
    }

    let photoFileName;
    // Procesamiento de la imagen de la noticia (si se proporcionó una)
    if (req.files && req.files.imageUrl) {
      const uploadsDir = path.join(global.__basedir, '/uploads');
      // Crear el directorio de subida si no existe
      await createPathIfNotExists(uploadsDir);

      // console.log(req.files.imageUrl);

      const imagenUrl = sharp(req.files.imageUrl.data);
      imagenUrl.resize(1000);

      photoFileName = `${Date.now()}_${req.files.imageUrl.name}`;
      await imagenUrl.toFile(path.join(uploadsDir, photoFileName));
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
    const lastUpdatedAt = new Date();

    await connect.query(
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
      message: `Enhorabuena ${name} ${surname}, tus datos de perfil han sido actualizados exitosamente`,
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
    if (connect) connect.release();
  }
}

module.exports = updateUser;

/*
{
  "name": "Davicito",
  "surname": "Castro",
  "email": "davidmartinezq@hotmail.com",
  "password": "123",
  "biography": "Soy pintor",
  "userId": 5
}
*/
