const getDB = require('../../database/db');

const { createPathIfNotExists } = require('../../helpers/helpers');

const path = require('path');
const sharp = require('sharp');

async function updateUser(req, res, next) {
  let connect = null;

  try {
    const {
      userId,
      name,
      createdAt,
      surname,
      email,
      password,
      biography,
      lastUpdatedAt,
    } = req.body;

    connect = await getDB();

    // Comprobar si se proporcionó id de usuario
    if (!userId) {
      return res.status(400).send({
        status: 'ko',
        error:
          '(userId) Le recordamos un campo obligatorio proporcionarnos su id de usuario',
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
    await connect.query(
      `
      UPDATE users
      SET imagenUrl = ?, name = ?, surname = ?, email = ?, password = SHA2(?, 512), biography = ?, createdAt = ?, lastUpdatedAt = UTC_TIMESTAMP()
      WHERE id = ?
      `,
      [
        photoFileName,
        name,
        surname,
        email,
        password,
        biography,
        createdAt,
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
        createdAt: createdAt,
        lastUpdatedAt: lastUpdatedAt,
        photoFileName: photoFileName,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connect) connect.release();
  }
}

module.exports = updateUser;
