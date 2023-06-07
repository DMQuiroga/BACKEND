'use strict';
// 1º FUNCIÓN PARA GENERAR ERROR
// 2ª CREAR PATH SI NO EXISTE: CARPETA uploads

const fs = require('fs/promises');
// Función para generar error
const generateError = (message, status) => {
  const error = new Error(message);
  error.httpStatus = status;
  return error;
};

// Creo el path si no existe para guardar la imagen
const createPathIfNotExists = async (path) => {
  try {
    await fs.access(path);
  } catch {
    await fs.mkdir(path);
  }
};

module.exports = {
  generateError,
  createPathIfNotExists,
};
