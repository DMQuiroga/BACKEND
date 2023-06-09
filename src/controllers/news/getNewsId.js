'use strict';
// OBTENER NOTICIA POR ID

const getConnection = require('../../database/db');

const getNewsId = async (req, res, next) => {
  const connect = await getConnection();

  try {
    const { id } = req.params;
    // Verificar si el formato del ID es válido
    if (isNaN(id)) {
      return res.status(400).send({
        status: 'ko',
        error:
          'Formato ID incorrecto. Lamentablemente, el valor proporcionado no es válido. Se requiere ingresar un número de identificación',
      });
    }
    // Obtener la noticia correspondiente al ID de usuario
    const [news] = await connect.query(
      `SELECT title, introText, text, imagenUrl, categoryId, publishDate  FROM news WHERE userId=?`,
      [id]
    );
    // Comprobar si se encontraron noticias para el usuario
    if (news.length) {
      return res.status(200).send({
        status: 'ok',
        message: `Felicidades, Ha recibido todas las noticias publicadas del usuario con id:${id}`,
        data: news,
      });
    } else {
      res.status(404).send({
        status: 'ko',
        error:
          'Lamentablemente, el identificador de usuario proporcionado no existe o este usuario no ha realizado ninguna publicación de noticias hasta el momento',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'ko',
      error: 'Error en el servidor',
    });
  } finally {
    connect.release();
  }
};

module.exports = getNewsId;
