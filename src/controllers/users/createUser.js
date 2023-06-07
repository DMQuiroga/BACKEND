'use strict';
// CREAR NUEVO USUARIO

const getDB = require('../../database/db');
const sendMail = require('../../helpers/sendGrid');

async function createUser(req, res, next) {
  let connect = null;

  try {
    const { name, surname, email, password } = req.body;

    let expr = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    if (!expr.test(email))
      return res.status(400).send({
        status: 'bad',
        mensaje: 'Error: La dirección de correo ' + email + ' es incorrecta.',
      });

    connect = await getDB();
    if (!email || !password) {
      return res.status(400).send({
        status: 'bad',
        mensaje: 'Faltan datos obligatorios para crear el usuario',
      });
    }

    const [userExist] = await connect.query(
      `SELECT id FROM users WHERE email=?`,
      [email]
    );
    if (userExist.length > 0) {
      return res.status(406).send({
        status: 'bad',
        mensaje: 'El usuario ya existe',
      });
    }

    const registrationcode = Math.floor(Math.random() * 1000000000000000000);

    await connect.query(
      `INSERT INTO users (name, surname, email, password, registrationcode) VALUES (?,?,?,SHA2(?,512),?)`,
      [name, surname, email, password, registrationcode]
    );

    const validationLink = `http://${process.env.API_HOST}:${process.env.PORT}/activate/${registrationcode}`;

    await sendMail({
      to: email,
      subject: 'Te acabas de registrar en HACKABOSS News',
      message: `
        Muchas gracias por registrarte en Hack a Boss News,
        pulsa el siguiente link para activar tu usuario:

        ${validationLink}
      `,
    });

    return res.status(200).send({
      status: 'ok',
      mensaje: 'Usuario creado correctamente',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connect) connect.release();
  }
}

module.exports = createUser;
