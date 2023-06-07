'use strict';
// OBTENER CATEGORIA POR ID

const getDB = require('../../database/db');

const getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const connect = await getDB();
    const [category] = await connect.query(
      `SELECT * FROM category WHERE id=?`,
      [id]
    );
    connect.release();
    if (category.length) {
      return res.send({
        status: 'ok',
        data: category[0],
      });
    } else {
      res
        .status(404)
        .send('{"status": "ko", "error": "Categoría no encontrada"}');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getCategory;
