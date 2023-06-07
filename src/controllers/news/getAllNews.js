'use strict';
// OBTENER TODAS LAS NOTICIAS

const getConnection = require('../../database/db');

const getAllNews = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(`
        SELECT title, introText, text, imagenUrl, categoryId, publishDate FROM news ORDER BY publishDate DESC
      `);

    res.send({
      status: 'ok',
      data: result,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getAllNews;
