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
        SELECT n.id, n.userId, n.title, n.introText, n.text, n.imagenUrl, n.categoryId, n.score, n.fakeNews, n.publishDate, u.id as userId, u.name, u.surname, u.email, u.createdAt, u.imagenUrl as userImageUrl, u.biography, u.lastUpdatedAt
        FROM news AS n
        INNER JOIN users AS u ON n.userId = u.id
        WHERE n.publishDate >= CURDATE() AND n.categoryId = ?
        ORDER BY n.score DESC
      `,
        [categoryId]
      );
    } else {
      [result] = await connection.query(`
        SELECT n.id, n.userId, n.title, n.introText, n.text, n.imagenUrl, n.categoryId, n.score, n.fakeNews, n.publishDate, u.id as userId, u.name, u.surname, u.email, u.createdAt, u.imagenUrl as userImageUrl, u.biography, u.lastUpdatedAt
        FROM news AS n
        INNER JOIN users AS u ON n.userId = u.id
        WHERE n.publishDate >= CURDATE()
        ORDER BY n.score DESC
      `);
    }

    if (result.length > 0) {
      res.status(200).send({
        status: 'ok',
        message: 'Obtuviste satisfactoriamente las noticias',
        data: result,
      });
    } else {
      res.status(404).send({
        status: 'ko',
        error: 'No se encontraron noticias para hoy',
        data: [],
      });
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getTodayNews;
