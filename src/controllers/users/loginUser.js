'use strict';
// LOGIN USUARIO

const getDB = require('../../database/db');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  try {
    const connect = await getDB();

    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send('Faltan datos');

    //comprobar que exista el usuario
    const [user] = await connect.query(
      `
            SELECT id, isAdmin, email, active
            FROM users
            WHERE email = ? AND password = SHA2(?, 512)
            `,
      [email, password]
    );

    if (user.length === 0)
      return res.status(401).send('Email o password incorrectos');

    if (user[0].active !== 1) {
      return res
        .status(401)
        .send(
          'El usuario no está activado, revisa la bandeja de entrada de tu email para activar tu usuario'
        );
    }

    //jsonwebtoken
    const info = {
      id: user[0].id,
      email: user[0].email,
      isAdmin: user[0].isAdmin,
    };

    //generar el token con el método "sign" el cuál recibe como argumentos un objeto con la info
    //una palabra secreta (nuestra/servidor) (.env SECRET_TOKEN) y el tiempo de vencimiento del token
    //palabra secreta la usa para poder desencriptar la información, codigo una clave o un hash
    const token = jwt.sign(info, process.env.SECRET, { expiresIn: '1d' });

    //se lo envío al usuario
    res.status(200).send({
      status: 'ok',
      message: 'Login',
      data: {
        token: token,
        user: info,
      },
    });
    connect.release();
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

module.exports = loginUser;
