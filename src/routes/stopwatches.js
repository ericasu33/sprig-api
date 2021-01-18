const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    db.query(
      `
        SELECT entries.id AS entry_ID, categories.name AS category_name, categories.color, tags.tag AS tag_name
        FROM entries
        JOIN categories
        ON categories.id = entries.category_id
        JOIN entries_tags
        ON entries_tags.entries_id = entries.id
        JOIN tags
        on entries_tags.tag_id = tags.id
        ORDER BY entry_id
      `
    ).then(data => {
      console.log(data);
      res.json(data);
    });
  });


  return router;

};
