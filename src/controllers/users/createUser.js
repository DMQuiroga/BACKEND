const getDB = require('../../database/db');

const sendMail = require('../../helpers/sendGrid');

async function createUser(req, res, next) {
  try {
    const { name, surname, email, password } = req.body;

    let expr =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!expr.test(email))
      return res.status(400).send({
        status: 'bad',
        mensaje: 'Error: La dirección de correo ' + email + ' es incorrecta.',
      });

    const connect = await getDB();
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

    //CREAR CÓDIGO DE REGISTRO PARA FUTURA ACTIVACIÓN
    const registrationcode = Math.floor(Math.random() * 1000000000000000000);

    await connect.query(
      //SHA2 es un estandar de cifrado que recibe como parámetro la llave que se utilizara y el número de bits del HASH,
      //de esta forma el valor será cifrado y se almacenará en la base de datos
      //SHA --> Secure Hash Algorithm
      `INSERT INTO users (name, surname, email, password, registrationcode) VALUES (?,?,?,SHA2(?,512),?)`,
      [name, surname, email, password, registrationcode]
    );
    //ENVIO DE EMAIL DE CONFIRMACIÓN DE CREACIÓN DE USUARIO
    const validationLink = `${process.env.DB_HOST}/activate/${registrationcode}`;

    await sendMail({
      to: email,
      subject: 'Te acabas de registrar en HACKABOSS News',
      message: `
            Muchas gracias por registrarte en Hack a Boss News,
            pulsa el siguiente link para activar tu usuario:

            ${validationLink}
          `,
    });

    connect.release();
    return res.status(200).send({
      status: 'ok',
      mensaje: 'Usuario creado correctamente',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = createUser;
