'use strict';
// EDITAR NOTICIA

const getConnection = require('../../database/db');

const {
  generateError,
  createPathIfNotExists,
} = require('../../helpers/helpers');

const path = require('path');
const sharp = require('sharp');

const editNews = async (req, res, next) => {
  let connection;

  try {
    const { newsId, categoryId, title, introText, text } = req.body;

    if (!newsId) {
      throw generateError('Introduzca el ID de la noticia a editar', 400);
    }
    if (!title || title.length > 250) {
      throw generateError(
        'El título es obligatorio y debe ser menor de 250 caracteres',
        400
      );
    }
    if (!introText || introText.length > 512) {
      throw generateError(
        'El texto de introducción de tu noticia es obligatorio y debe ser menor de 512 caracteres',
        400
      );
    }
    if (!text) {
      throw generateError('Debes escribir un texto en la noticia', 400);
    }
    if (!categoryId) {
      throw generateError(
        'Es obligatorio asignar una categoría a tu noticia',
        400
      );
    }

    let photoFileName;

    if (req.files && req.files.imageUrl) {
      const uploadsDir = path.join(global.__basedir, '/uploads');

      await createPathIfNotExists(uploadsDir);

      const imagenUrl = sharp(req.files.imageUrl.data);
      imagenUrl.resize(1000);

      photoFileName = `${Date.now()}_${req.files.imageUrl.name}.jpg`;
      await imagenUrl.toFile(path.join(uploadsDir, photoFileName));
    }

    connection = await getConnection();

    // Verificar si la noticia existe antes de editarla
    const [existingNews] = await connection.query(
      'SELECT * FROM news WHERE id = ?',
      [newsId]
    );

    if (existingNews.length === 0) {
      throw generateError('La noticia no existe', 404);
    }

    // Actualizar los datos de la noticia
    await connection.query(
      `
      UPDATE news
      SET imagenUrl = ?, categoryId = ?, title = ?, introText = ?, text = ?
      WHERE id = ?
      `,
      [photoFileName, categoryId, title, introText, text, newsId]
    );

    res.send({
      status: 'ok',
      message: `La noticia con ID ${newsId} ha sido editada correctamente`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = { editNews };
