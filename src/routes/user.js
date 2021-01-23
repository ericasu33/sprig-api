const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get('/logout', (req, res) => {
    req.session = null;
    res.json({ success: true });
  });

  // primitive login system, purely for testing
  router.get('/:id', (req, res) => {

    const query = `
    SELECT * FROM users
    WHERE id = $1
    `;

    db.query(query, [req.params.id]).then((data) => {
      if (data.rows.length === 0) return res.status(401).json({msg: 'hi'});
      const { id, username, email } = data.rows[0];
      req.session.user = { id, username, email };
      res.json({ id, username, email });
    }).catch((err) => {
      res.json(err);
    });
  });

  return router;

};