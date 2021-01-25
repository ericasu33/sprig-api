const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    const query1 = `
      SELECT id, 
        user_id, 
        name, 
        work, 
        short_break, 
        num_repeats as cycles, 
        long_break, 
        shortbr_start_audio_alert_id as short_b_start_sound, 
        shortbr_end_audio_alert_id as short_b_end_sound, 
        longbr_start_audio_alert_id as long_b_start_sound, 
        longbr_end_audio_alert_id as long_b_end_sound
      FROM timers
    `;

    const query2 = `
      SELECT *
      FROM audio_alerts
    `;

    Promise.all([db.query(query1), db.query(query2)])
      .then(([timersData, audiosData]) => {
        const timers = timersData.rows;
        res.json(timers);
      });
  });

  router.post('/', (req, res) => {
    const { timer } = req.body;
    const query = `
    INSERT INTO timers (user_id, name, work, short_break, num_repeats, long_break, shortbr_start_audio_alert_id, shortbr_end_audio_alert_id, longbr_start_audio_alert_id, longbr_end_audio_alert_id)
    VALUES (NULL, $1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
    `;
    db.query(query, [
      timer.name, 
      timer.work, 
      timer.short_break, 
      timer.cycles,
      timer.long_break,
      timer.short_b_start_sound, 
      timer.short_b_end_sound, 
      timer.long_b_start_sound, 
      timer.long_b_end_sound
    ]).then((data) => {
        res.json(data.rows[0]);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
  router.post('/:id', (req, res) => {
    const { timer } = req.body;
    const query = `
    UPDATE timers
    SET name = $2, 
        work = $3, 
        short_break = $4,
        num_repeats = $5,
        long_break = $6,
        shortbr_start_audio_alert_id = $7,
        shortbr_end_audio_alert_id = $8,
        longbr_start_audio_alert_id = $9,
        longbr_start_audio_alert_id = $10
    WHERE id = $1
    RETURNING *;
    `;
    db.query(query, [
      req.params.id,
      timer.name, 
      timer.work, 
      timer.short_break, 
      timer.cycles,
      timer.long_break,
      timer.short_b_start_sound, 
      timer.short_b_end_sound, 
      timer.long_b_start_sound, 
      timer.long_b_end_sound
    ])
      .then((data) => {
        res.json(data.rows[0]);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  return router;

};