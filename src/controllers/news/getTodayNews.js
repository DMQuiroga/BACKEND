'use strict';
// 1- OBTENER NOTICIAS DE HOY POR ID CATEGORIA ORDENADAS POR PUNTACIÓN
// 2- OBTENER NOTICIAS DE HOY ORDENADAS POR PUNTUACIÓN

const getConnection = require('../../database/db');

const getTodayNews = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();

    const { categoryId } = req.params;

    let result;
    if (categoryId) {
      [result] = await connection.query(
        `
        SELECT title, introText, text, imagenUrl, categoryId, publishDate FROM news WHERE publishDate >= CURDATE() AND categoryId = ? ORDER BY score DESC
      `,
        [categoryId]
      );
    } else {
      [result] = await connection.query(`
        SELECT title, introText, text, imagenUrl, categoryId, publishDate FROM news WHERE publishDate >= CURDATE() ORDER BY score DESC
      `);
    }

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

module.exports = getTodayNews;
