'use strict';

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
        data: category,
      });
    } else {
      res.status(400).send('Categoría no encontrada');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getCategory;
