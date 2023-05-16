'use strict';
// ELIMINAR NOTICIA

const getConnection = require('../../database/db');

async function deleteNew(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    //sacamos la id de la entrada que queremos borrar
    const { id } = req.params;

    // borramos la entrada
    let [result] = await connection.query(
      `
      DELETE FROM news
      WHERE id=? AND userId=?
    `,
      [id, req.userId]
    );

    console.log(result);

    if (result.affectedRows !== 1) {
      return res.status(400).send({
        status: 'bad',
        message: `La noticia con id ${id} no pudo ser borrada`,
      });
    }

    // devolvemos una respuesta
    res.send({
      status: 'ok',
      message: `La noticia con id ${id} fue borrada`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = deleteNew;
