const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    const query = `
    SELECT * FROM audio_alerts
    `;
    db.query(query)
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  return router;
};