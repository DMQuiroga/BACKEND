'use strict';

const getDB = require('../../database/db');

const getAllCategories = async (req, res, next) => {
  try {
    const connect = await getDB();
    const [categories] = await connect.query(`SELECT * FROM category`);
    connect.release();
    return res.send({
      status: 'ok',
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllCategories;
