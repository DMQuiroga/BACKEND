'use strict';
// OBTENER TODAS LAS NOTICIAS

const getConnection = require('../../database/db');

const getAllNews = async (req, res, next) => {
  let connection;

  try {
    // Establecemos una conexión a la base de datos
    connection = await getConnection();
    // Obtenemos todas las noticias de la base de datos
    const [result] = await connection.query(`
        SELECT title, introText, text, imagenUrl, categoryId, score, publishDate FROM news ORDER BY publishDate DESC
      `);

    // Verificamos si se encontraron noticias
    if (result.length > 0) {
      return res.status(200).send({
        status: 'ok',
        message: 'Se han obtenido todas las noticias exitosamente',
        data: result,
      });
    } else {
      return res.status(404).send({
        status: 'ko',
        error: 'No se encontraron noticias disponibles',
        data: [],
      });
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getAllNews;
