'use strict';
// OBTENER TODAS LAS CATEGORIAS

const getDB = require('../../database/db');

const getAllCategories = async (req, res, next) => {
  const connect = await getDB();

  try {
    // Consultar todas las categorías en la base de datos
    const [categories] = await connect.query(`SELECT * FROM category`);
    // Comprobar si se encontraron categorías
    if (categories.length > 0) {
      return res.send({
        status: 'ok',
        message:
          'Has logrado obtener todas las categorías disponibles de manera exitosa',
        data: categories,
      });
    } else {
      return res.send({
        status: 'ko',
        error: 'No se encontraron categorías disponibles',
        data: [],
      });
    }
  } catch (error) {
    next(error);
  } finally {
    connect.release();
  }
};

module.exports = getAllCategories;
