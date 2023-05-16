# LET'S GO!

## 1º: Ejecutar comando npm i

## 2º: Crear base de datos. 2 opciones:

**2.1**: OPCIÓN 1.

_2.1.1_: Abrir MYSQL Worbench --> Ir a pestaña File --> Open SQL Script...

_2.1.2_: db/schema.sql

_2.1.3_: db/testsql/testsql.sql

**2.2**: OPCIÓN 2.

_2.2.1_: Abrir MYSQL Worbench

_2.2.2_: Ejecutar= CREATE DATABASE IF NOT EXISTS hb_news;

_2.2.3_: Ejecutar= node src/database/initDB.js

_2.2.4_: Abrir MYSQL Worbench --> Ir a pestaña File --> Open SQL Script...

_2.2.5_: db/testsql/testsql.sql

## 3º: .env

PORT=8080

DB_HOST=localhost

DB_USER=

DB_PASSWORD=

DB_DATABASE=hb_news

SECRET=

SENDGRID_API_KEY=

SEND_FROM=

## 4º: Ejecutar: npm start

## 5º: Peticiones de Postman
