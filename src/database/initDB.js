'use strict';
// CREAR DATABASE hb_news

// 1ª En SQL= CREATE DATABASE IF NOT EXISTS hb_news;
// 2º Ejecutar= node src/database/initDB.js

require('dotenv').config();
const getConnection = require('./db');

async function main() {
  let connection;

  try {
    connection = await getConnection();

    console.log('Borrando tablas existentes');
    await connection.query('DROP TABLE IF EXISTS news');
    await connection.query('DROP TABLE IF EXISTS category');
    await connection.query('DROP TABLE IF EXISTS users');

    console.log('Creando tablas');
    // Creando tabla users
    await connection.query(`
    CREATE TABLE users (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100),
        surname VARCHAR(200),
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(512) NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        imageUrl VARCHAR(512),
        biography VARCHAR(250),
        lastUpdatedAt DATETIME NULL,
        registrationcode BIGINT UNIQUE,
        active BOOLEAN NOT NULL DEFAULT false,
        isadmin BOOLEAN NOT NULL DEFAULT false
    );
    `);
    // Creando tabla category
    await connection.query(`
    CREATE TABLE category (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100)
    );
    `);
    // Creando tabla news
    await connection.query(`
    CREATE TABLE news (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        userId INT UNSIGNED NOT NULL,
        imagenUrl VARCHAR(512),
        title VARCHAR(250),
        publishDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        deleted BOOLEAN DEFAULT false,
        score INT NOT NULL DEFAULT 0,
        fakeNew INT NOT NULL DEFAULT 0,
        categoryId INT UNSIGNED NOT NULL,
        introText VARCHAR(512) NOT NULL,
        text TEXT,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (categoryId) REFERENCES category(id)
    );
    `);
  } catch (error) {
    console.Console.error(error);
  } finally {
    //Liberamos la conexión
    if (connection) connection.release();
    process.exit();
  }
}

main();
