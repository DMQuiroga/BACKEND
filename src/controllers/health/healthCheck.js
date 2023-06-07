'use strict';
// RESPONDE: I'M ALIVE

const healthCheck = async (req, res) => {
  res.send({
    status: "I'm alive",
  });
};

module.exports = healthCheck;
