'use strict';
// CREAR NUEVA NOTICIA

const getConnection = require('../../database/db');
const { createPathIfNotExists } = require('../../helpers/helpers');
const path = require('path');
const sharp = require('sharp');

const createNew = async (req, res, next) => {
  let connection;

  try {
    const { categoryId, title, introText, text } = req.body;
    // Comprobar la validez y longitud del título
    if (!title || title.length > 250) {
      return res.status(400).send({
        status: 'ko',
        error:
          '(title) Le recordamos que el título de la noticia es un campo obligatorio y debe tener una extensión máxima de 250 caracteres.',
      });
    }
    // Comprobar la validez y longitud del texto introductorio
    if (!introText || introText.length > 512) {
      return res.status(400).send({
        status: 'ko',
        error:
          '(introText) El texto introductorio de la noticia es obligatorio y debe tener una extensión máxima de 512 caracteres.',
      });
    }
    // Comprobar si se proporcionó contenido textual para la noticia
    if (!text) {
      return res.status(400).send({
        status: 'ko',
        error: '(text) Se requiere agregar contenido textual a la noticia.',
      });
    }
    // Comprobar si se asignó una categoría a la noticia
    if (!categoryId) {
      return res.status(400).send({
        status: 'ko',
        error:
          '(categoryId) Es obligatorio atribuir una categoría a la noticia.',
      });
    }

    let photoFileName;
    // Procesamiento de la imagen de la noticia (si se proporcionó una)
    if (req.files && req.files.imageUrl) {
      const uploadsDir = path.join(global.__basedir, '/uploads');
      // Crear el directorio de subida si no existe
      await createPathIfNotExists(uploadsDir);

      const imageUrl = sharp(req.files.imageUrl.data);
      imageUrl.resize(1000);

      photoFileName = `${Date.now()}_${req.files.imageUrl.name}`;
      await imageUrl.toFile(path.join(uploadsDir, photoFileName));
    }

    connection = await getConnection();

    // Comprobar si el usuario actual coincide con el userId que crea la noticia
    if (req.userId !== req.userId) {
      return res.status(403).send({
        status: 'ko',
        error: 'No tienes permisos para crear esta noticia.',
      });
    }

    // Insertar una nueva noticia en la base de datos
    await connection.query(
      `
      INSERT INTO news (
        imagenUrl,
        categoryId,
        title,
        introText,
        text,
        userId
      )
      VALUES (?,?,?,?,?,?)
    `,
      [photoFileName, categoryId, title, introText, text, req.userId]
    );

    res.status(200).send({
      status: 'ok',
      message: `Usted con su identificación de usuario ${req.userId}, ha creado exitosamente una nueva noticia.`,
      data: {
        userId: req.userId,
        categoryId: categoryId,
        title: title,
        introText: introText,
        text: text,
        photoFileName: photoFileName,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { createNew };
