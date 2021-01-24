const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    const query1 = `
        SELECT entries.id AS entry_ID, tags.tag AS tag_name 
        FROM entries
        JOIN entries_tags
        ON entries_tags.entries_id = entries.id
        JOIN tags
        on entries_tags.tag_id = tags.id
        ORDER BY entry_id
      `;

    const query2 = `
        SELECT entries.id AS entry_ID, entries.start_time, entries.pause_start_time, entries.end_time, entries.cumulative_pause_duration, EXTRACT(EPOCH FROM (entries.end_time - entries.start_time)) - entries.cumulative_pause_duration AS total_duration_ms, entries.intensity, categories.name AS category_name, categories.color AS category_color
        FROM entries
        JOIN categories
        ON categories.id = entries.category_id
      `;

    Promise.all([db.query(query1), db.query(query2)])
      .then(([tagsData, entriesData]) => {
        const tags = tagsData.rows;
        const entries = entriesData.rows;

        for (const entry of entries) {
          for (const tag of tags) {
            if (entry.tags && entry.entry_id === tag.entry_id) {
              entry.tags.push(tag.tag_name);
            } else if (!entry.tags && entry.entry_id === tag.entry_id) {
              entry.tags = [tag.tag_name];
            }
          }
        }
        res.json(
          entries
        );
      });
  });

  router.post('/:entry_id/tags/:tag_id', (req, res) => {
    const query = `
    INSERT INTO entries_tags (tag_id, entries_id)
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


  router.delete('/:entry_id/tags/:tag_id', (req, res) => {
    const query = `
    DELETE FROM entries_tags WHERE entries_id = $1, tag_id = $2;
    `;
    db.query(query, [req.params.entry_id, req.params.tag_id])
      .then((data) => {
        res.json(data.rows[0]);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  return router;

};


// `
//         SELECT entries.id AS entry_ID, categories.name AS category_name, categories.color AS category_color, tags.tag AS tag_name
//         FROM entries
//         JOIN categories
//         ON categories.id = entries.category_id
//         JOIN entries_tags
//         ON entries_tags.entries_id = entries.id
//         JOIN tags
//         on entries_tags.tag_id = tags.id
//         ORDER BY entry_id
//       `