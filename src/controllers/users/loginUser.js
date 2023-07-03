'use strict';
// LOGIN USUARIO

const getDB = require('../../database/db');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  const connect = await getDB();

  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send('Faltan datos');

    //comprobar que exista el usuario
    const [user] = await connect.query(
      `
            SELECT id, name, surname, email, active, biography, imagenUrl
            FROM users
            WHERE email = ? AND password = SHA2(?, 512)
            `,
      [email, password]
    );

    if (user.length === 0)
      return res.status(401).send({
        status: 'ko',
        error: `Lamentablemente, el email o password son incorrectos`,
      });

    if (user[0].active !== 1) {
      return res.status(401).send({
        status: 'ko',
        error:
          'El usuario no está activado, revisa la bandeja de entrada de tu email para activar tu usuario',
      });
    }

    const info = {
      id: user[0].id,
      name: user[0].name,
      surname: user[0].surname,
      email: user[0].email,
      biography: user[0].biography,
      imagenUrl: user[0].imagenUrl,
    };

    //jsonwebtoken
    //generar el token con el método "sign" el cuál recibe como argumentos un objeto con la info
    //una palabra secreta (nuestra/servidor) (.env SECRET_TOKEN) y el tiempo de vencimiento del token
    //palabra secreta la usa para poder desencriptar la información, codigo una clave o un hash
    const token = jwt.sign(info, process.env.SECRET, { expiresIn: '1d' });
    info.token = token;

    //se lo envío al usuario
    res.status(200).send({
      status: 'ok',
      message: 'Login',
      data: info,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  } finally {
    connect.release();
  }
};

module.exports = loginUser;
