'use strict';
// CREAR NUEVO USUARIO

const getDB = require('../../database/db');
const sendMail = require('../../helpers/sendGrid');

async function createUser(req, res, next) {
  let connect = null;

  try {
    const { name, surname, email, password, biography } = req.body;

    let expr = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    if (!expr.test(email))
      return res.status(400).send({
        status: 'ko',
        error: 'Error: La dirección de correo ' + email + ' es incorrecta.',
      });

    connect = await getDB();
    if (!email || !password) {
      return res.status(400).send({
        status: 'ko',
        error: 'Faltan datos obligatorios para crear el usuario',
      });
    }

    const [userExist] = await connect.query(
      `SELECT id FROM users WHERE email=?`,
      [email]
    );
    if (userExist.length > 0) {
      return res.status(406).send({
        status: 'ko',
        error: 'El usuario ya existe',
      });
    }

    const registrationcode = Math.floor(Math.random() * 1000000000000000000);

    await connect.query(
      `INSERT INTO users (name, surname, email, password, biography, registrationcode) VALUES (?,?,?,SHA2(?,512),?,?)`,
      [name, surname, email, password, biography, registrationcode]
    );

    const validationLink = `http://${process.env.API_HOST}:${process.env.PORT}/activate/${registrationcode}`;

    await sendMail({
      to: email,
      subject: 'Te acabas de registrar en HACKABOSS News',
      message: `
      Estimado(a) usuario(a),

      En nombre del equipo de Hack a Boss News, nos complace darte la más cálida bienvenida a nuestra plataforma.
      Tu decisión de unirte a nuestra comunidad demuestra un genuino interés por el conocimiento y el crecimiento personal.
      
      Como portal dedicado a la difusión de noticias y perspectivas innovadoras, nos comprometemos a ofrecerte contenido de calidad, 
      con el propósito de enriquecer tu experiencia y ampliar tus horizontes intelectuales.
      
      Te invitamos a completar tu registro seleccionando el enlace a continuación, el cual activará tu cuenta.
      
      ${validationLink}
      
      Nos emociona contar contigo como miembro de nuestra comunidad y estamos ansiosos por compartir contigo información valiosa, inspiradora y educativa.
      A través de Hack a Boss News, podrás mantenerte al tanto de los últimos avances en diversas áreas de interés, así como participar en votaciones de noticias.
      
      No dudes en explorar todas las secciones y características que nuestra plataforma tiene para ofrecerte.
      
      Si tienes alguna duda sobre el funcionamiento de nuestra aplicación solo tienes que pedir un ticket en la plataforma de soporte: hackaboss.freshdesk.com/
      Nuestro equipo de soporte formado por Stefano Peraldini, Bárbara Imbernón Fuentes y Berto estará encantado de ayudarte y a tu disponibildad total 24/7.
      Si prefieres llamarlos por telefono también puedes y si es de noche mejor, que les gusta despertarse con una llamadita nocturna.
      
      Una vez más, te damos las gracias por unirte a Hack a Boss News. ¡Esperamos que tu experiencia aquí sea gratificante y enriquecedora!
      
      Atentamente,
      
      El equipo de Hack a Boss News

      Solo sé que no sé nada pero allá vamos!!!
      `,
    });

    return res.status(200).send({
      status: 'ok',
      menssaje: 'Usuario creado correctamente',
      data: {
        name: name,
        surname: surname,
        email: email,
        biography: biography,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connect) connect.release();
  }
}

module.exports = createUser;

/*
{
  "name": "David",
  "surname": "Martínez Quiroga",
  "email": "davidmartinezq@hotmail.com",
  "password": "123",
  "biography": "Soy Desarrolador"
  }
*/
