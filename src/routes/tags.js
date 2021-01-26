const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get('/', (req, res) => {
    const query = `
    SELECT * FROM tags;
    `;
    db.query(query)
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.post('/', (req, res) => {
    const tag = req.body;
    const query = `
    INSERT INTO tags (tag)
    VALUES ($1)
    RETURNING *;
    `;
    db.query(query, [tag.value])
      .then((data) => {
        res.json(data.rows[0]);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.delete('/:id', (req, res) => {
    const query = `
    DELETE FROM tags WHERE id = $1;
    `;
    db.query(query, [req.params.id])
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  return router;
}