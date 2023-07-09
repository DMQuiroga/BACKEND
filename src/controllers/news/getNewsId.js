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
      `
      SELECT n.id, n.userId, n.title, n.introText, n.text, n.imagenUrl, n.categoryId, n.score, n.fakeNews, n.publishDate, u.id as userId, u.name, u.surname, u.email, u.createdAt, u.imagenUrl as userImageUrl, u.biography, u.lastUpdatedAt
      FROM news AS n
      INNER JOIN users AS u ON n.userId = u.id
      WHERE n.publishDate >= CURDATE() AND n.userId=?
      ORDER BY n.score DESC
    `,
      [id]
    );
    // Comprobar si se encontraron noticias para el usuario
    if (news.length) {
      return res.status(200).send({
        status: 'ok',
        message: `Felicidades, Ha recibido todas las noticias publicadas por el usuario con id:${id}`,
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
