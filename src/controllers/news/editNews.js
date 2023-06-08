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

    if (!newsId) {
      return res.status(400).send({
        status: 'ko',
        error:
          'Solicitamos que introduzca el identificador (ID) correspondiente a la noticia que se desea editar',
      });
    }

    if (!title || title.length > 250) {
      return res.status(400).send({
        status: 'ko',
        error:
          'Le recordamos que el título de la noticia es un campo obligatorio y debe tener una extensión máxima de 250 caracteres',
      });
    }

    if (!introText || introText.length > 512) {
      return res.status(400).send({
        status: 'ko',
        error:
          'El texto introductorio de la noticia es obligatorio y debe tener menos de 512 caracteres.',
      });
    }

    if (!text) {
      return res.status(400).send({
        status: 'ko',
        error: 'Se requiere agregar contenido textual a la noticia',
      });
    }

    if (!categoryId) {
      return res.status(400).send({
        status: 'ko',
        error: 'Es obligatorio atribuir una categoría a la noticia',
      });
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
      message: `La noticia con ID: ${newsId} ha sido editada correctamente`,
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
