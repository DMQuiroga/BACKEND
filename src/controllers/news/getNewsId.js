'use strict';
// OBTENER NOTICIA POR ID

const getConnection = require('../../database/db');

const getNewsId = async (req, res, next) => {
  const connect = await getConnection();

  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).send({
        error: 'Formato ID incorrecto',
      });
    }

    const [news] = await connect.query(
      `SELECT title, introText, text, imagenUrl, categoryId, publishDate  FROM news WHERE userId=?`,
      [id]
    );

    if (news.length) {
      return res.send(news);
    } else {
      res.status(404).send({
        error:
          'El id de usuario no existe o este usuario no ha publicado noticias',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: 'Error en el servidor',
    });
  } finally {
    connect.release();
  }
};

module.exports = getNewsId;
