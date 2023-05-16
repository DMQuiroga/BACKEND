'use strict';
// CONEXIÓN

const mysql = require('mysql2/promise');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

let pool;
// Crea un pool de conexiones a la BD (si no existe) y devuelve una conexción

const getConnection = async function getDB() {
  //Si no existe pool, creo pool y lo conecto a connectionLimit, host, DB_HOST, user, password, database, timezone
  if (!pool) {
    console.log(
      `Creando conexión DB host:${DB_HOST} user:${DB_USER} schema:${DB_DATABASE}`
    );
    pool = mysql.createPool({
      connectionLimit: 10,
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      timezone: 'Z',
    });
  }
  return await pool.getConnection(); //Devolvemos pool si ya existe
};
// Exportamos getDB
module.exports = getConnection;
