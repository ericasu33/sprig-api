const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    db.query(
      `
        SELECT * 
        FROM timers
        JOIN audio_alerts 
        ON timers.shortbr_start_audio_alert_id = audio_alerts.id
        JOIN users
        ON timers.user_id = users.id;
      `
    ).then(({ rows: timers }) => {
      res.json(timers);
    });
  });


  return router;

};