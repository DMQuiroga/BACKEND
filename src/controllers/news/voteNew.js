const getConnection = require('../../database/db');

// VOTAR NOTICIA

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
        status: 'bad',
        data: 'La noticia no existe',
      });
    }

    let nuevoScore = result[0].score + 1;
    await connection.query(
      `
        UPDATE news SET score = ? WHERE id = ?;
        `,
      [nuevoScore, id]
    );

    res.send({
      status: 'ok',
      data: 'Like aplicado a la noticia, puntuación actual ' + nuevoScore,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

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
        status: 'bad',
        data: 'La noticia no existe',
      });
    }

    let nuevoScore = result[0].score - 1;
    await connection.query(
      `
          UPDATE news SET score = ? WHERE id = ?;
          `,
      [nuevoScore, id]
    );

    res.send({
      status: 'ok',
      data: 'Dislike aplicado a la noticia, puntuación actual ' + nuevoScore,
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
