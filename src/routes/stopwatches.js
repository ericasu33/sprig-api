const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // GET ENTRIES-TAGS ASSOCIATIONS
  router.get("/entries_tags", (req, res) => {
    const query = `
      SELECT entries.id AS entry_id, tags.id AS tag_id
      FROM entries
      JOIN entries_tags ON entries_tags.entries_id = entries.id
      JOIN tags ON entries_tags.tag_id = tags.id
      ORDER BY entry_id
    `;
    db.query(query)
      .then((data) => {
        const entries_tags = data.rows;
        res.json(entries_tags);
      });
    });

  // GET ALL ENTRIES
  router.get("/", (req, res) => {
    const query = `
      SELECT id, 
        category_id AS category,
        start_time,
        end_time,
        pause_start_time,
        cumulative_pause_duration,
        intensity * 100 as intensity
      FROM entries
    `;
    db.query(query)
      .then((data) => {
        const entries = data.rows;
        res.json(entries);
      });
    });

  // ADD A TAG FOR AN ENTRY
  router.post('/:entry_id/tags/:tag_id', (req, res) => {
    const query = `
    INSERT INTO entries_tags (entries_id, tag_id)
    VALUES ($1, $2)
    RETURNING *;
    `;
    db.query(query, [req.params.entry_id, req.params.tag_id])
      .then((data) => {
        res.json(data.rows[0]);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
  router.delete('/:entry_id/tags', (req, res) => {
    const query = `
    DELETE FROM entries_tags WHERE entries_id = $1;
    `;
    db.query(query, [req.params.entry_id])
      .then((data) => {
        res.json(data.rows[0]);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // DELETE A TAG FOR AN ENTRY
  router.delete('/:entry_id/tags/:tag_id', (req, res) => {
    const query = `
    DELETE FROM entries_tags WHERE entries_id = $1 AND tag_id = $2;
    `;
    db.query(query, [req.params.entry_id, req.params.tag_id])
      .then((data) => {
        res.json(data.rows[0]);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // CREATE ENTRY
  router.post('/', (req, res) => {
    const entry = req.body;
    const query = `
    INSERT INTO entries (category_id, start_time, end_time, pause_start_time, cumulative_pause_duration, intensity)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `;
    db.query(query, [
      entry.category,
      entry.start_time,
      entry.end_time,
      entry.pause_start_time,
      entry.cumulative_pause_duration,
      entry.intensity/100,
    ])
      .then((data) => {
        res.json(data.rows[0]);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
  // UPDATE ENTRY
  router.put('/:id', (req, res) => {
    const entry = req.body;
    const query = `
    UPDATE entries
    SET category_id = $2, 
    start_time = $3, 
    end_time = $4,
    pause_start_time = $5,
    cumulative_pause_duration = $6, 
    intensity = $7
    WHERE id = $1
    RETURNING *;
    `;
    db.query(query, [
      req.params.id,
      entry.category,
      entry.start_time,
      entry.end_time,
      entry.pause_start_time,
      entry.cumulative_pause_duration,
      entry.intensity/100,
    ])
      .then((data) => {
        res.json(data.rows[0]);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // DELETE AN ENTRY
  router.delete('/:id', (req, res) => {
    const query = `
    DELETE FROM entries WHERE id = $1;
    `;
    db.query(query, [req.params.id])
      .then((data) => {
        res.json(data.rows[0]);
      })
      .catch((err) => {
        res.json(err);
      });
  });
    

  return router;

};

