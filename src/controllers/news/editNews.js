'use strict';
// EDITAR NOTICIA

const getConnection = require('../../database/db');
const { createPathIfNotExists } = require('../../helpers/helpers');
const path = require('path');
const sharp = require('sharp');

const editNews = async (req, res, next) => {
  let connection;

  try {
    const { newsId, categoryId, title, introText, text } = req.body;
    // Comprobar si se proporcionó el ID de la noticia
    if (!newsId) {
      return res.status(400).send({
        status: 'ko',
        error:
          '(newsId) Por favor, introduce el identificador (ID) correspondiente a la noticia que deseas editar.',
      });
    }
    // Comprobar la longitud y validez del título
    if (!title || title.length > 250) {
      return res.status(400).send({
        status: 'ko',
        error:
          '(title) Recuerda que el título de la noticia es obligatorio y debe tener un máximo de 250 caracteres.',
      });
    }
    // Comprobar la longitud y validez del texto introductorio
    if (!introText || introText.length > 512) {
      return res.status(400).send({
        status: 'ko',
        error:
          '(introText) El texto introductorio de la noticia es obligatorio y debe tener un máximo de 512 caracteres.',
      });
    }
    // Comprobar si se proporcionó contenido textual para la noticia
    if (!text) {
      return res.status(400).send({
        status: 'ko',
        error:
          '(text) Por favor, proporciona contenido textual para la noticia.',
      });
    }
    // Comprobar si se asignó una categoría a la noticia
    if (!categoryId) {
      return res.status(400).send({
        status: 'ko',
        error:
          '(categoryId) Es obligatorio asignar una categoría a la noticia.',
      });
    }

    let photoFileName;
    // Procesamiento de la imagen de la noticia (si se proporcionó una)
    if (req.files && req.files.imageUrl) {
      const uploadsDir = path.join(global.__basedir, '/uploads');
      // Crear el directorio de subida si no existe
      await createPathIfNotExists(uploadsDir);

      const imageUrl = sharp(req.files.imageUrl.data);
      imageUrl.resize(1000);

      photoFileName = `${Date.now()}_${req.files.imageUrl.name}.jpg`;
      await imageUrl.toFile(path.join(uploadsDir, photoFileName));
    }

    connection = await getConnection();

    // Verificar si la noticia existe antes de editarla
    const [existingNews] = await connection.query(
      'SELECT * FROM news WHERE id = ?',
      [newsId]
    );

    if (existingNews.length === 0) {
      return res.status(404).send({
        status: 'ko',
        error: 'Lamentablemente, la noticia solicitada no existe.',
      });
    }

    // Actualizar los datos de la noticia en la base de datos
    await connection.query(
      `
      UPDATE news
      SET imagenUrl = ?, categoryId = ?, title = ?, introText = ?, text = ?
      WHERE id = ?
      `,
      [photoFileName, categoryId, title, introText, text, newsId]
    );

    res.status(200).send({
      status: 'ok',
      message: `La noticia con ID ${newsId} ha sido editada exitosamente.`,
      data: {
        newsId: newsId,
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
    if (connection) {
      connection.release();
    }
  }
};

module.exports = { editNews };
