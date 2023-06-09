'use strict';
// OBTENER CATEGORIA POR ID

const getDB = require('../../database/db');

const getCategory = async (req, res, next) => {
  const connect = await getDB();

  try {
    // Obtenemos id de la categoria
    const { id } = req.params;
    // Comprobar si el valor proporcionado es un número
    if (isNaN(id)) {
      return res.status(400).send({
        status: 'ko',
        error:
          'Lamentablemente, el valor proporcionado no es válido. Se requiere ingresar un número de identificación de categoría en lugar de texto',
      });
    }
    // Consultar la categoría correspondiente al ID
    const [category] = await connect.query(
      `SELECT * FROM category WHERE id=?`,
      [id]
    );
    // Comprobar si se encontró la categoría
    if (category.length) {
      return res.status(200).send({
        status: 'ok',
        message: `Has logrado obtener la categoría con id:${category[0].id} de manera exitosa`,
        data: category[0],
      });
    } else {
      return res.status(404).send({
        status: 'ko',
        error: `No se encontró ninguna categoría con el ID:${id}`,
      });
    }
  } catch (error) {
    next(error);
  } finally {
    connect.release();
  }
};
module.exports = getCategory;
