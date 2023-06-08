'use strict';
// CREAR NUEVA NOTICIA

const getConnection = require('../../database/db');

const {
  generateError,
  createPathIfNotExists,
} = require('../../helpers/helpers');

const path = require('path');
const sharp = require('sharp');

const createNew = async (req, res, next) => {
  let connection;

  try {
    const { categoryId, title, introText, text } = req.body;

    if (!title || title > 250) {
      throw generateError(
        'El título es obligatorio y debe ser menor de 250 caracteres',
        400
      );
    }
    if (!introText || introText > 512) {
      throw generateError(
        'El texto de introducción de tu noticia es obligatorio y debe ser menor de 512 caracteres',
        400
      );
    }
    if (!text) {
      throw generateError('Debes escibir un texto en la noticia', 400);
    }
    if (!categoryId) {
      throw generateError(
        'Es obligatorio asignar una categoria a tu noticia',
        400
      );
    }

    let photoFileName;

    if (req.files && req.files.imageUrl) {
      const uploadsDir = path.join(global.__basedir, '/uploads');

      await createPathIfNotExists(uploadsDir);

      // console.log(req.files.imageUrl);

      const imagenUrl = sharp(req.files.imageUrl.data);
      imagenUrl.resize(1000);

      photoFileName = `${Date.now()}_${req.files.imageUrl.name}`;
      await imagenUrl.toFile(path.join(uploadsDir, photoFileName));
    }

    connection = await getConnection();

    await connection.query(
      `
              INSERT INTO news (
                imagenUrl,
                categoryId,
                title,
                introText,
                text, 
                userId)
              VALUES (?,?,?,?,?,?)
          `,
      [photoFileName, categoryId, title, introText, text, req.userId]
    );

    res.send({
      status: 'ok',
      message: `Usted con su id:${req.userId} acaba de crear una noticia correctamente`,
      data: {
        userId: req.userId,
        categoryId: categoryId,
        title: title,
        introText: introText,
        text: text,
        photoFileName: photoFileName,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { createNew };
