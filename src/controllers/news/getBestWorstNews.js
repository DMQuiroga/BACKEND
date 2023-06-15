'use scrict';
// 1- OBTENER 3 NOTICIAS CON SCORE MÁS ALTO
// 2- OBTENER 3 NOTICIAS CON SCORE MÁS BAJO

const getConnection = require('../../database/db');

// 1- OBTENER 3 NOTICIAS CON SCORE MÁS ALTO
const getBestNews = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(`
      SELECT title, introText, text, imagenUrl, categoryId, score, fakeNew, publishDate FROM news ORDER BY score DESC LIMIT 3
    `);

    if (!result.length) {
      return res.status(404).send({
        status: 'ko',
        error: 'No se encontraron noticias',
      });
    }

    res.status(200).send({
      status: 'ok',
      message: 'Las mejores 3 noticias se han obtenido correctamente',
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: 'ko',
      error: 'Error al obtener las mejores noticias',
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// 2- OBTENER 3 NOTICIAS CON SCORE MÁS BAJO
const getWorstNews = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(`
      SELECT title, introText, text, imagenUrl, categoryId, score,  fakeNew, publishDate FROM news ORDER BY score ASC LIMIT 3
    `);

    if (!result.length) {
      return res.status(404).send({
        status: 'ko',
        error: 'No se encontraron noticias',
      });
    }

    res.status(200).send({
      status: 'ok',
      message: 'Las 3 peores noticias se han obtenido correctamente',
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: 'ko',
      error: 'Error al obtener las peores noticias',
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = { getBestNews, getWorstNews };
