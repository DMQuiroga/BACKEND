const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers/helpers');

const authUser = (req, res, next) => {
  try {
    // Sacamos authorization del header de nuestra petición
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateError('Falta la cabecera de Authorization', 401);
    }

    // Comprobamos que el token sea correcto
    // Si el token no es correcto generaremos un error
    let tokenData;
    // Verificamos la autorización y la clave de .env
    // Si no da error, token pasará a valer eso
    try {
      tokenData = jwt.verify(authorization, process.env.SECRET);
    } catch {
      throw generateError('Token incorrecto', 401);
    }

    // Metemos la información del token en la request para usarla en el controlador
    req.userId = tokenData.id;
    req.userIsAdmin = tokenData.isAdmin;

    // Saltamos al controlador
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authUser,
};
