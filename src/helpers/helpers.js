'use strict';
const fs = require('fs/promises');
// Función para generar error
const generateError = (message, status) => {
  const error = new Error(message);
  error.httpStatus = status;
  return error;
};

// CREO EL path si no existe para guardar la imgagen
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
