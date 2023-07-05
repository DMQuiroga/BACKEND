'use strict';
// VOTAR NOTICIA POSITIVAMENTE O NEGATICAMENTE Y VOTAR NOTICIA FAKE

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

    const [votes] = await connection.query(
      `
        SELECT * FROM userVotes WHERE newId = ? AND userId = ?
      `,
      [id, req.userId]
    );

    if (votes.length > 0) {
      return res.status(403).send({
        status: 'ko',
        error: 'Ya se ha votado la noticia',
      });
    }

    let nuevoScore = result[0].score + 1;
    await connection.query(
      `
      INSERT INTO userVotes (
        newId,
        userId,
        vote      )
      VALUES (?,?,?)
        `,
      [id, req.userId, 1]
    );
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

    const [votes] = await connection.query(
      `
        SELECT * FROM userVotes WHERE newId = ? AND userId = ?
      `,
      [id, req.userId]
    );

    console.log(votes);
    if (votes.length > 0) {
      return res.status(403).send({
        status: 'ko',
        error: 'Ya se ha votado la noticia',
      });
    }

    let nuevoScore = result[0].score - 1;
    await connection.query(
      `
      INSERT INTO userVotes (
        newId,
        userId,
        vote      )
      VALUES (?,?,?)
        `,
      [id, req.userId, -1]
    );
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

// VOTAR NOTICIA FAKE
const voteFakeNews = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;
    const { amount } = req.body;

    // Validar que la cantidad sea válida
    if (amount !== 1 && amount !== 100) {
      return res.status(400).send({
        status: 'ko',
        error: 'La cantidad especificada no es válida',
      });
    }

    const [result] = await connection.query(
      `
          SELECT fakeNews FROM news WHERE id = ?
      `,
      [id]
    );

    if (!result.length) {
      return res.status(404).send({
        status: 'ko',
        error: 'La noticia no existe',
      });
    }

    let nuevoScoreFakeNews = result[0].fakeNews + amount;

    await connection.query(
      `
        UPDATE news SET fakeNews = ? WHERE id = ?;
      `,
      [nuevoScoreFakeNews, id]
    );

    res.status(200).send({
      status: 'ok',
      message: `¿Fake news? ¡Pfff! Voto a noticia aplicado (${amount}), puntuación actual ${nuevoScoreFakeNews}`,
      data: nuevoScoreFakeNews,
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
  voteFakeNews,
};
