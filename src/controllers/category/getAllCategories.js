'use strict';
// OBTENER TODAS LAS CATEGORIAS

const getDB = require('../../database/db');

const getAllCategories = async (req, res, next) => {
  const connect = await getDB();

  try {
    const [categories] = await connect.query(`SELECT * FROM category`);
    return res.send({
      status: 'ok',
      message: `Has logrado obtener todas las categorías disponibles de manera exitosa`,
      data: categories,
    });
  } catch (error) {
    next(error);
  } finally {
    connect.release();
  }
};

module.exports = getAllCategories;
