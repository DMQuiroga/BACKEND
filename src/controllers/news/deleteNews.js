'use strict';
// ELIMINAR NOTICIA

const getConnection = require('../../database/db');

async function deleteNews(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // Obtenemos id de la entrada que queremos borrar
    const { id } = req.params;

    // Borramos la entrada
    let [result] = await connection.query(
      `
      DELETE FROM news
      WHERE id=? AND userId=?
    `,
      [id, req.userId]
    );

    // console.log(result);

    if (result.affectedRows !== 1) {
      return res.status(400).send({
        status: 'ko',
        error: `Lamentablemente, no se pudo eliminar la noticia con identificación ${id}`,
      });
    }

    // Devolvemos una respuesta
    res.status(200).send({
      status: 'ok',
      message: `Con satisfacción, le informo que la noticia con identificación ${id} ha sido eliminada exitosamente`,
      data: {
        userId: req.userId,
        idNew: id,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = deleteNews;
