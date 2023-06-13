'use strict';
// VOTAR NOTICIA POSITIVAMENTE O NEGATICAMENTE

const getConnection = require('../../database/db');

// VOTAR NOTICIA POSITIVAMENTE
const voteLike = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    const [result] = await connection.query(
      `
          SELECT score FROM news WHERE id = ?
      `,
      [id]
    );

    if (!result.length) {
      return res.status(404).send({
        status: 'ko',
        error: 'La noticia no existe',
      });
    }

    let nuevoScore = result[0].score + 1;
    await connection.query(
      `
        UPDATE news SET score = ? WHERE id = ?;
        `,
      [nuevoScore, id]
    );

    res.status(200).send({
      status: 'ok',
      message: 'Like aplicado a la noticia, puntuación actual ' + nuevoScore,
      data: result[0].score + 1,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

// VOTAR NOTICIA NEGATICAMENTE
const voteDislike = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    const [result] = await connection.query(
      `
            SELECT score FROM news WHERE id = ?
        `,
      [id]
    );

    if (!result.length) {
      return res.status(404).send({
        status: 'ko',
        error: 'La noticia no existe',
      });
    }

    let nuevoScore = result[0].score - 1;
    await connection.query(
      `
          UPDATE news SET score = ? WHERE id = ?;
          `,
      [nuevoScore, id]
    );

    res.status(200).send({
      status: 'ok',
      message: 'Dislike aplicado a la noticia, puntuación actual ' + nuevoScore,
      data: result[0].score - 1,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  voteLike,
  voteDislike,
};
